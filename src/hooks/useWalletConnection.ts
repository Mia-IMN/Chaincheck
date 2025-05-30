import { useState, useEffect } from 'react';
import { WalletConnection } from '../types';

export const useWalletConnection = () => {
  const [wallet, setWallet] = useState<WalletConnection | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWithGoogle = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      // Simulate zk login flow - in real implementation, you'd use the Sui zk login SDK
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock Google user data
      const mockUser = {
        address: '0x742d35Cc6C7EC86532F73c8F01e65Ac8c1234567',
        type: 'zk-google' as const,
        name: 'Professional User',
        email: 'user@company.com',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=google-user`
      };
      
      setWallet(mockUser);
      
      // Store in localStorage for persistence
      localStorage.setItem('wallet-connection', JSON.stringify(mockUser));
    } catch (err) {
      setError('Failed to connect with Google. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const connectWithSuiWallet = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      // Simulate Sui wallet connection - in real implementation, you'd use @mysten/wallet-adapter
      if (!window.suiWallet) {
        throw new Error('Sui wallet not detected. Please install a Sui wallet extension.');
      }
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock Sui wallet data
      const mockWallet = {
        address: '0x8a94c5e9f123456789abcdef0123456789abcdef',
        type: 'sui-wallet' as const,
        name: 'Sui Wallet'
      };
      
      setWallet(mockWallet);
      
      // Store in localStorage for persistence
      localStorage.setItem('wallet-connection', JSON.stringify(mockWallet));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect Sui wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setWallet(null);
    setError(null);
    localStorage.removeItem('wallet-connection');
  };

  const copyAddress = async () => {
    if (wallet?.address) {
      await navigator.clipboard.writeText(wallet.address);
    }
  };

  // Load wallet from localStorage on component mount
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

  return {
    wallet,
    isConnecting,
    error,
    connectWithGoogle,
    connectWithSuiWallet,
    disconnect,
    copyAddress
  };
};