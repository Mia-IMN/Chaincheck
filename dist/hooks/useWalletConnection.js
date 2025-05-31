"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWalletConnection = void 0;
const react_1 = require("react");
const ed25519_1 = require("@mysten/sui/keypairs/ed25519");
const client_1 = require("@mysten/sui/client");
const zklogin_1 = require("@mysten/sui/zklogin");
const jwt_decode_1 = require("jwt-decode");
// Configuration - you'll need to set these up
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '377644124279-60pcuf9j0529jr32dr03dc3e6r91h3kv.apps.googleusercontent.com';
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI || 'http://localhost:3000';
const PROVER_URL = 'https://prover-dev.mystenlabs.com/v1'; // Mysten Labs devnet prover
const SUI_NETWORK = 'devnet'; // or 'testnet', 'mainnet'
const FULLNODE_URL = `https://fullnode.${SUI_NETWORK}.sui.io`;
const useWalletConnection = () => {
    const [wallet, setWallet] = (0, react_1.useState)(null);
    const [isConnecting, setIsConnecting] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [ephemeralKeyPair, setEphemeralKeyPair] = (0, react_1.useState)(null);
    const [maxEpoch, setMaxEpoch] = (0, react_1.useState)(0);
    const [randomness, setRandomness] = (0, react_1.useState)('');
    const suiClient = new client_1.SuiClient({ url: FULLNODE_URL });
    // Generate ephemeral keypair and setup for zkLogin
    const setupEphemeralKeyPair = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Get current epoch info
            const { epoch } = yield suiClient.getLatestSuiSystemState();
            const maxEpochValue = Number(epoch) + 2; // Set expiration to current epoch + 2
            // Generate ephemeral keypair
            const keypair = new ed25519_1.Ed25519Keypair();
            const randomnessValue = (0, zklogin_1.generateRandomness)();
            setEphemeralKeyPair(keypair);
            setMaxEpoch(maxEpochValue);
            setRandomness(randomnessValue);
            return { keypair, maxEpochValue, randomnessValue };
        }
        catch (err) {
            console.error('Failed to setup ephemeral keypair:', err);
            throw err;
        }
    });
    const connectWithGoogle = () => __awaiter(void 0, void 0, void 0, function* () {
        setIsConnecting(true);
        setError(null);
        try {
            // Step 1: Setup ephemeral keypair if not already done
            let currentKeyPair = ephemeralKeyPair;
            let currentMaxEpoch = maxEpoch;
            let currentRandomness = randomness;
            if (!currentKeyPair) {
                const setup = yield setupEphemeralKeyPair();
                currentKeyPair = setup.keypair;
                currentMaxEpoch = setup.maxEpochValue;
                currentRandomness = setup.randomnessValue;
            }
            // Step 2: Generate nonce
            const ephemeralPublicKey = currentKeyPair.getPublicKey();
            const extendedEphemeralPublicKey = (0, zklogin_1.getExtendedEphemeralPublicKey)(ephemeralPublicKey);
            const nonce = (0, zklogin_1.generateNonce)(ephemeralPublicKey, currentMaxEpoch, currentRandomness);
            // Store ephemeral data in sessionStorage for later use
            sessionStorage.setItem('ephemeral_private_key', currentKeyPair.getSecretKey());
            sessionStorage.setItem('max_epoch', currentMaxEpoch.toString());
            sessionStorage.setItem('randomness', currentRandomness);
            sessionStorage.setItem('extended_ephemeral_public_key', extendedEphemeralPublicKey);
            // Step 3: Construct OAuth URL
            const oauthParams = new URLSearchParams({
                client_id: GOOGLE_CLIENT_ID,
                redirect_uri: REDIRECT_URI,
                response_type: 'id_token',
                scope: 'openid email profile',
                nonce: nonce,
                state: 'zklogin_google' // Custom state to identify this flow
            });
            const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${oauthParams.toString()}`;
            // Step 4: Redirect to Google OAuth
            window.location.href = oauthUrl;
        }
        catch (err) {
            setError('Failed to initiate Google login. Please try again.');
            console.error('Google login error:', err);
            setIsConnecting(false);
        }
    });
    // Handle OAuth redirect callback
    const handleOAuthCallback = () => __awaiter(void 0, void 0, void 0, function* () {
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
            const jwtPayload = (0, jwt_decode_1.jwtDecode)(idToken);
            // Retrieve ephemeral data from sessionStorage
            const storedPrivateKey = sessionStorage.getItem('ephemeral_private_key');
            const storedMaxEpoch = sessionStorage.getItem('max_epoch');
            const storedRandomness = sessionStorage.getItem('randomness');
            const storedExtendedPublicKey = sessionStorage.getItem('extended_ephemeral_public_key');
            if (!storedPrivateKey || !storedMaxEpoch || !storedRandomness || !storedExtendedPublicKey) {
                throw new Error('Ephemeral data not found');
            }
            // Recreate ephemeral keypair
            const ephemeralKeyPair = ed25519_1.Ed25519Keypair.fromSecretKey(storedPrivateKey);
            const maxEpoch = parseInt(storedMaxEpoch);
            // Generate salt (in production, use a proper salt management strategy)
            const userSalt = BigInt('0x' + Array(32).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''));
            // Step 5: Get zkLogin address
            const zkLoginAddress = (0, zklogin_1.jwtToAddress)(idToken, userSalt);
            // Step 6: Get ZK proof
            const zkpRequestPayload = {
                jwt: idToken,
                extendedEphemeralPublicKey: storedExtendedPublicKey,
                maxEpoch: maxEpoch,
                jwtRandomness: storedRandomness,
                salt: userSalt.toString(),
                keyClaimName: 'sub'
            };
            const response = yield fetch(PROVER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(zkpRequestPayload),
            });
            if (!response.ok) {
                throw new Error(`Prover request failed: ${response.statusText}`);
            }
            const zkProof = yield response.json();
            // Create wallet connection object
            const walletConnection = {
                address: zkLoginAddress,
                type: 'zk-google',
                name: jwtPayload.email || 'Google User',
                email: jwtPayload.email,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${jwtPayload.sub}`
            };
            // Store wallet data and zk proof for later use
            const walletData = Object.assign(Object.assign({}, walletConnection), { zkProof, ephemeralPrivateKey: storedPrivateKey, maxEpoch, userSalt: userSalt.toString(), jwt: idToken });
            sessionStorage.setItem('zklogin_wallet', JSON.stringify(walletData));
            setWallet(walletConnection);
            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
        catch (err) {
            setError('Failed to complete Google login. Please try again.');
            console.error('OAuth callback error:', err);
        }
        finally {
            setIsConnecting(false);
        }
    });
    const connectWithSuiWallet = () => __awaiter(void 0, void 0, void 0, function* () {
        setIsConnecting(true);
        setError(null);
        console.log('Connecting to Sui wallet...');	
        try {
            // Check if Sui wallet is available
            if (!window.suiWallet) {
                console.log("Window: ", window)
                throw new Error('Sui wallet not detected. Please install a Sui wallet extension.');
            }
            // Request connection to Sui wallet
            const response = yield window.suiWallet.requestPermissions();
            if (!response.granted) {
                throw new Error('Sui wallet connection denied.');
            }
            // Get accounts
            const accounts = yield window.suiWallet.getAccounts();
            if (accounts.length === 0) {
                throw new Error('No accounts found in Sui wallet.');
            }
            const account = accounts[0];
            const walletConnection = {
                address: account.address,
                type: 'sui-wallet',
                name: 'Sui Wallet'
            };
            setWallet(walletConnection);
            // Store in localStorage for persistence
            localStorage.setItem('wallet-connection', JSON.stringify(walletConnection));
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to connect Sui wallet');
        }
        finally {
            setIsConnecting(false);
        }
    });
    const disconnect = () => {
        setWallet(null);
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
    const copyAddress = () => __awaiter(void 0, void 0, void 0, function* () {
        if (wallet === null || wallet === void 0 ? void 0 : wallet.address) {
            yield navigator.clipboard.writeText(wallet.address);
        }
    });
    // Sign a transaction using zkLogin (example function)
    const signTransaction = (transactionBlock) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const walletData = sessionStorage.getItem('zklogin_wallet');
            if (!walletData) {
                throw new Error('zkLogin wallet data not found');
            }
            const { ephemeralPrivateKey, zkProof, maxEpoch, userSalt, jwt } = JSON.parse(walletData);
            // Recreate ephemeral keypair
            const ephemeralKeyPair = ed25519_1.Ed25519Keypair.fromSecretKey(ephemeralPrivateKey);
            // Sign transaction with ephemeral key
            const { signature: userSignature } = yield transactionBlock.sign({
                client: suiClient,
                signer: ephemeralKeyPair,
            });
            // Create zkLogin signature
            const zkLoginSignature = (0, zklogin_1.getZkLoginSignature)({
                inputs: Object.assign(Object.assign({}, zkProof), { addressSeed: (0, zklogin_1.genAddressSeed)(BigInt(userSalt), 'sub', (0, jwt_decode_1.jwtDecode)(jwt).sub, (0, jwt_decode_1.jwtDecode)(jwt).aud.toString()).toString() }),
                maxEpoch,
                userSignature,
            });
            return zkLoginSignature;
        }
        catch (err) {
            console.error('Transaction signing failed:', err);
            throw err;
        }
    });
    // Check for OAuth callback on component mount
    (0, react_1.useEffect)(() => {
        // Check if this is an OAuth callback
        if (window.location.hash.includes('id_token=')) {
            handleOAuthCallback();
        }
        else {
            // Load wallet from localStorage on component mount
            const savedWallet = localStorage.getItem('wallet-connection');
            if (savedWallet) {
                try {
                    setWallet(JSON.parse(savedWallet));
                }
                catch (err) {
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
                }
                catch (err) {
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
exports.useWalletConnection = useWalletConnection;
