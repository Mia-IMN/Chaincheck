import { useState, useEffect } from 'react';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { SuiClient } from '@mysten/sui/client';
import { 
  generateNonce, 
  generateRandomness, 
  getExtendedEphemeralPublicKey,
  jwtToAddress
} from '@mysten/sui/zklogin';
import { jwtDecode } from 'jwt-decode';
import type { WalletConnection } from '../types';

// Configuration
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '377644124279-jbv71q5n3vl173c4nm3ajhv2eovok8rc.apps.googleusercontent.com';
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI || window.location.origin;
const PROVER_URL = 'https://prover-dev.mystenlabs.com/v1';
const SUI_NETWORK = 'mainnet';
const FULLNODE_URL = `https://fullnode.${SUI_NETWORK}.sui.io`;

interface JwtPayload {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  nonce: string;
  email?: string;
  name?: string;
}

export const useZkLogin = () => {
  const [zkWallet, setZkWallet] = useState<WalletConnection | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ephemeralKeyPair, setEphemeralKeyPair] = useState<Ed25519Keypair | null>(null);
  const [maxEpoch, setMaxEpoch] = useState<number>(0);
  const [randomness, setRandomness] = useState<string>('');

  const suiClient = new SuiClient({ url: FULLNODE_URL });

  // Generate ephemeral keypair and setup for zkLogin
  const setupEphemeralKeyPair = async () => {
    try {
      const { epoch } = await suiClient.getLatestSuiSystemState();
      const maxEpochValue = Number(epoch) + 2;
      
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
      let currentKeyPair = ephemeralKeyPair;
      let currentMaxEpoch = maxEpoch;
      let currentRandomness = randomness;

      if (!currentKeyPair) {
        const setup = await setupEphemeralKeyPair();
        currentKeyPair = setup.keypair;
        currentMaxEpoch = setup.maxEpochValue;
        currentRandomness = setup.randomnessValue;
      }

      const ephemeralPublicKey = currentKeyPair.getPublicKey();
      const extendedEphemeralPublicKey = getExtendedEphemeralPublicKey(ephemeralPublicKey);
      
      const nonce = generateNonce(
        ephemeralPublicKey,
        currentMaxEpoch,
        currentRandomness
      );

      // Store ephemeral data for later use
      sessionStorage.setItem('ephemeral_private_key', currentKeyPair.getSecretKey());
      sessionStorage.setItem('max_epoch', currentMaxEpoch.toString());
      sessionStorage.setItem('randomness', currentRandomness);
      sessionStorage.setItem('extended_ephemeral_public_key', extendedEphemeralPublicKey);

      // Debug logs
      console.log('Debug - Google Client ID:', GOOGLE_CLIENT_ID);
      console.log('Debug - Redirect URI:', REDIRECT_URI);

      const oauthParams = new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: 'id_token',
        scope: 'openid email profile',
        nonce: nonce,
        state: 'zklogin_google'
      });

      const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${oauthParams.toString()}`;
      console.log('Debug - OAuth URL:', oauthUrl);
      
      window.location.href = oauthUrl;
      
    } catch (err) {
      setError('Failed to initiate Google login. Please try again.');
      console.error('Google login error:', err);
      setIsConnecting(false);
    }
  };

  const handleOAuthCallback = async () => {
    try {
      const urlFragment = window.location.hash.substring(1);
      const params = new URLSearchParams(urlFragment);
      const idToken = params.get('id_token');
      const state = params.get('state');

      if (!idToken || state !== 'zklogin_google') {
        return;
      }

      setIsConnecting(true);

      const jwtPayload = jwtDecode(idToken) as JwtPayload;
      
      const storedPrivateKey = sessionStorage.getItem('ephemeral_private_key');
      const storedMaxEpoch = sessionStorage.getItem('max_epoch');
      const storedRandomness = sessionStorage.getItem('randomness');
      const storedExtendedPublicKey = sessionStorage.getItem('extended_ephemeral_public_key');

      if (!storedPrivateKey || !storedMaxEpoch || !storedRandomness || !storedExtendedPublicKey) {
        throw new Error('Ephemeral data not found');
      }

      const maxEpoch = parseInt(storedMaxEpoch);
      const userSalt = BigInt('0x' + Array(32).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''));
      const zkLoginAddress = jwtToAddress(idToken, userSalt);
      
      const zkpRequestPayload = {
        jwt: idToken,
        extendedEphemeralPublicKey: storedExtendedPublicKey,
        maxEpoch,
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

      const walletConnection: WalletConnection = {
        address: zkLoginAddress,
        type: 'zk-google' as const,
        name: jwtPayload.email || 'Google User',
        email: jwtPayload.email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${jwtPayload.sub}`
      };

      const walletData = {
        ...walletConnection,
        zkProof,
        ephemeralPrivateKey: storedPrivateKey,
        maxEpoch,
        userSalt: userSalt.toString(),
        jwt: idToken
      };

      sessionStorage.setItem('zklogin_wallet', JSON.stringify(walletData));
      setZkWallet(walletConnection);

      window.history.replaceState({}, document.title, window.location.pathname);
      
    } catch (err) {
      setError('Failed to complete Google login. Please try again.');
      console.error('OAuth callback error:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectZkLogin = () => {
    setZkWallet(null);
    setError(null);
    setEphemeralKeyPair(null);
    setMaxEpoch(0);
    setRandomness('');
    sessionStorage.removeItem('zklogin_wallet');
    sessionStorage.removeItem('ephemeral_private_key');
    sessionStorage.removeItem('max_epoch');
    sessionStorage.removeItem('randomness');
    sessionStorage.removeItem('extended_ephemeral_public_key');
  };

  // Load zkLogin wallet on mount and check for OAuth callback
  useEffect(() => {
    if (window.location.hash.includes('id_token=')) {
      handleOAuthCallback();
    } else {
      const zkLoginWallet = sessionStorage.getItem('zklogin_wallet');
      if (zkLoginWallet) {
        try {
          const walletData = JSON.parse(zkLoginWallet);
          setZkWallet({
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
    // zkLogin state
    zkWallet,
    isConnecting,
    error,
    
    // zkLogin methods
    connectWithGoogle,
    handleOAuthCallback,
    disconnectZkLogin,
    
    // zkLogin utilities
    setupEphemeralKeyPair
  };
};