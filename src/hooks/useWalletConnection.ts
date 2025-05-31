import { useState, useEffect } from 'react';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { SuiClient } from '@mysten/sui/client';
import "@mysten/dapp-kit/dist/index.css"
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { createNetworkConfig } from '@mysten/dapp-kit';
import { useWallets, useCurrentWallet } from '@mysten/dapp-kit';
import { ConnectButton, useWalletKit } from '@mysten/wallet-kit';
import { 
  generateNonce, 
  generateRandomness, 
  getExtendedEphemeralPublicKey,
  jwtToAddress,
  getZkLoginSignature,
  genAddressSeed
} from '@mysten/sui/zklogin';
import { jwtDecode } from 'jwt-decode';
import { WalletConnection } from '../types';

// Configuration - you'll need to set these up
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your_google_client_id';
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI || 'https://chaincheck.onrender.com';
const PROVER_URL = 'https://prover-dev.mystenlabs.com/v1'; // Mysten Labs devnet prover
const SUI_NETWORK = 'devnet'; // or 'testnet', 'mainnet'
const FULLNODE_URL = `https://fullnode.${SUI_NETWORK}.sui.io`;

interface SuiWallet extends WalletError {
  accounts: Array<{
    address: string;
    publicKey: string | null;
    label?: string;
    chainId?: string;
  }>;
  chains: string[];
  features: Record<string, boolean>;
  icon: string;
  name: string;
  version: string;
}

interface WalletError extends Error {
  code?: number;
  details?: string;
}

// Interface for JWT payload
interface JwtPayload {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  nonce: string;
  email?: string; // Google includes email in JWT
  name?: string;  // Google includes name in JWT
}

export const useWalletConnection = () => {
  const [wallet, setWallet] = useState<WalletConnection | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ephemeralKeyPair, setEphemeralKeyPair] = useState<Ed25519Keypair | null>(null);
  const [maxEpoch, setMaxEpoch] = useState<number>(0);
  const [randomness, setRandomness] = useState<string>('');

  const suiClient = new SuiClient({ url: FULLNODE_URL });
  const walletKit = useWalletKit();

  // Generate ephemeral keypair and setup for zkLogin
  const setupEphemeralKeyPair = async () => {
    try {
      // Get current epoch info
      const { epoch } = await suiClient.getLatestSuiSystemState();
      const maxEpochValue = Number(epoch) + 2; // Set expiration to current epoch + 2
      
      // Generate ephemeral keypair
      const keypair = new Ed25519Keypair();
      const randomnessValue = generateRandomness();
      
      setEphemeralKeyPair(keypair);
      setMaxEpoch(maxEpochValue);
      setRandomness(randomnessValue);
      
      return { keypair, maxEpochValue, randomnessValue };
    } catch (err) {
      console.error('Failed to setup ephemeral keypair:', err);
      throw err;
    }
  };

  const connectWithGoogle = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      // Step 1: Setup ephemeral keypair if not already done
      let currentKeyPair = ephemeralKeyPair;
      let currentMaxEpoch = maxEpoch;
      let currentRandomness = randomness;

      if (!currentKeyPair) {
        const setup = await setupEphemeralKeyPair();
        currentKeyPair = setup.keypair;
        currentMaxEpoch = setup.maxEpochValue;
        currentRandomness = setup.randomnessValue;
      }

      // Step 2: Generate nonce
      const ephemeralPublicKey = currentKeyPair.getPublicKey();
      const extendedEphemeralPublicKey = getExtendedEphemeralPublicKey(ephemeralPublicKey);
      
      const nonce = generateNonce(
        ephemeralPublicKey,
        currentMaxEpoch,
        currentRandomness
      );

      // Store ephemeral data in sessionStorage for later use
      sessionStorage.setItem('ephemeral_private_key', currentKeyPair.getSecretKey());
      sessionStorage.setItem('max_epoch', currentMaxEpoch.toString());
      sessionStorage.setItem('randomness', currentRandomness);
      sessionStorage.setItem('extended_ephemeral_public_key', extendedEphemeralPublicKey);

      // Step 3: Construct OAuth URL
      console.log('Debug - Google Client ID:', GOOGLE_CLIENT_ID);
      console.log('Debug - Redirect URI:', REDIRECT_URI);
      
      const oauthParams = new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: 'id_token',
        scope: 'openid email profile',
        nonce: nonce,
        state: 'zklogin_google' // Custom state to identify this flow
      });

      const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${oauthParams.toString()}`;
      console.log('Debug - OAuth URL:', oauthUrl);
      
      // Step 4: Redirect to Google OAuth
      window.location.href = oauthUrl;
      
    } catch (err) {
      setError('Failed to initiate Google login. Please try again.');
      console.error('Google login error:', err);
      setIsConnecting(false);
    }
  };

  // Handle OAuth redirect callback
  const handleOAuthCallback = async () => {
    try {
      // Extract JWT from URL fragment
      const urlFragment = window.location.hash.substring(1);
      const params = new URLSearchParams(urlFragment);
      const idToken = params.get('id_token');
      const state = params.get('state');

      if (!idToken || state !== 'zklogin_google') {
        return; // Not our callback
      }

      setIsConnecting(true);

      // Decode and validate JWT
      const jwtPayload = jwtDecode(idToken) as JwtPayload;
      
      // Retrieve ephemeral data from sessionStorage
      const storedPrivateKey = sessionStorage.getItem('ephemeral_private_key');
      const storedMaxEpoch = sessionStorage.getItem('max_epoch');
      const storedRandomness = sessionStorage.getItem('randomness');
      const storedExtendedPublicKey = sessionStorage.getItem('extended_ephemeral_public_key');

      if (!storedPrivateKey || !storedMaxEpoch || !storedRandomness || !storedExtendedPublicKey) {
        throw new Error('Ephemeral data not found');
      }

      // Recreate ephemeral keypair
      const ephemeralKeyPair = Ed25519Keypair.fromSecretKey(storedPrivateKey);
      const maxEpoch = parseInt(storedMaxEpoch);

      // Generate salt (in production, use a proper salt management strategy)
      const userSalt = BigInt('0x' + Array(32).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''));

      // Step 5: Get zkLogin address
      const zkLoginAddress = jwtToAddress(idToken, userSalt);

      // Step 6: Get ZK proof
      const zkpRequestPayload = {
        jwt: idToken,
        extendedEphemeralPublicKey: storedExtendedPublicKey,
        maxEpoch: maxEpoch,
        jwtRandomness: storedRandomness,
        salt: userSalt.toString(),
        keyClaimName: 'sub'
      };

      const response = await fetch(PROVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(zkpRequestPayload),
      });

      if (!response.ok) {
        throw new Error(`Prover request failed: ${response.statusText}`);
      }

      const zkProof = await response.json();

      // Create wallet connection object
      const walletConnection: WalletConnection = {
        address: zkLoginAddress,
        type: 'zk-google' as const,
        name: jwtPayload.email || 'Google User',
        email: jwtPayload.email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${jwtPayload.sub}`
      };

      // Store wallet data and zk proof for later use
      const walletData = {
        ...walletConnection,
        zkProof,
        ephemeralPrivateKey: storedPrivateKey,
        maxEpoch,
        userSalt: userSalt.toString(),
        jwt: idToken
      };

      sessionStorage.setItem('zklogin_wallet', JSON.stringify(walletData));
      setWallet(walletConnection);

      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
    } catch (err) {
      setError('Failed to complete Google login. Please try again.');
      console.error('OAuth callback error:', err);
    } finally {
      setIsConnecting(false);
    }
  };


const connectWithSuiWallet = async () => {
  console.log("Connecting with sui blockchain wallet")
    setIsConnecting(true);
    setError(null);
    
    try {
      // Connect to Sui wallet specifically
      await walletKit.connect('Sui Wallet');
      console.log("Got here")
      
      if (walletKit.currentAccount) {
        const walletConnection: WalletConnection = {
          address: walletKit.currentAccount.address,
          type: 'sui-wallet',
          name: walletKit.currentAccount.label || 'Sui Wallet'
        };
        
        setWallet(walletConnection);
        localStorage.setItem('wallet-connection', JSON.stringify(walletConnection));
      }
    } catch (err) {
      const error = err as WalletError;
      console.error('Wallet connection error:', error);
      setError(error.message || 'Failed to connect Sui wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = async () => {


    setWallet(null);
    walletKit.disconnect();
    setError(null);
    setEphemeralKeyPair(null);
    setMaxEpoch(0);
    setRandomness('');
    localStorage.removeItem('wallet-connection');
    sessionStorage.removeItem('zklogin_wallet');
    sessionStorage.removeItem('ephemeral_private_key');
    sessionStorage.removeItem('max_epoch');
    sessionStorage.removeItem('randomness');
    sessionStorage.removeItem('extended_ephemeral_public_key');
  };

  const copyAddress = async () => {
    if (wallet?.address) {
      await navigator.clipboard.writeText(wallet.address);
    }
  };

  // Sign a transaction using zkLogin (example function)
  const signTransaction = async (transactionBlock: any) => {
    try {
      const walletData = sessionStorage.getItem('zklogin_wallet');
      if (!walletData) {
        throw new Error('zkLogin wallet data not found');
      }

      const { ephemeralPrivateKey, zkProof, maxEpoch, userSalt, jwt } = JSON.parse(walletData);
      
      // Recreate ephemeral keypair
      const ephemeralKeyPair = Ed25519Keypair.fromSecretKey(ephemeralPrivateKey);
      
      // Sign transaction with ephemeral key
      const { signature: userSignature } = await transactionBlock.sign({
        client: suiClient,
        signer: ephemeralKeyPair,
      });

      // Create zkLogin signature
      const zkLoginSignature = getZkLoginSignature({
        inputs: {
          ...zkProof,
          addressSeed: genAddressSeed(
            BigInt(userSalt),
            'sub',
            (jwtDecode(jwt) as JwtPayload).sub,
            (jwtDecode(jwt) as JwtPayload).aud.toString()
          ).toString()
        },
        maxEpoch,
        userSignature,
      });

      return zkLoginSignature;
    } catch (err) {
      console.error('Transaction signing failed:', err);
      throw err;
    }
  };

  useEffect(() => {
    const savedWallet = localStorage.getItem('wallet-connection');
    if (savedWallet) {
      try {
        setWallet(JSON.parse(savedWallet));
      } catch (err) {
        localStorage.removeItem('wallet-connection');
      }
    }
  }, []);

  // Check for OAuth callback on component mount
  useEffect(() => {
    // Check if this is an OAuth callback
    if (window.location.hash.includes('id_token=')) {
      handleOAuthCallback();
    } else {
      // Load wallet from localStorage on component mount
      const savedWallet = localStorage.getItem('wallet-connection');
      if (savedWallet) {
        try {
          setWallet(JSON.parse(savedWallet));
        } catch (err) {
          localStorage.removeItem('wallet-connection');
        }
      }

      // Check for zkLogin wallet in sessionStorage
      const zkLoginWallet = sessionStorage.getItem('zklogin_wallet');
      if (zkLoginWallet && !savedWallet) {
        try {
          const walletData = JSON.parse(zkLoginWallet);
          setWallet({
            address: walletData.address,
            type: walletData.type,
            name: walletData.name,
            email: walletData.email,
            avatar: walletData.avatar
          });
        } catch (err) {
          sessionStorage.removeItem('zklogin_wallet');
        }
      }
    }
  }, []);

  return {
    wallet,
    isConnecting,
    error,
    connectWithGoogle,
    connectWithSuiWallet,
    disconnect,
    copyAddress,
    signTransaction, // Added transaction signing capability
  };
};