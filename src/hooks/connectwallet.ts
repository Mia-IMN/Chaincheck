import { useState, useEffect } from 'react';
import { useWallet } from '@suiet/wallet-kit';
import type { WalletConnection } from '../types';

export const useConnectWallet = () => {
  const [suiWallet, setSuiWallet] = useState<WalletConnection | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use @suiet/wallet-kit hook - this supports ALL Sui wallets automatically
  const {
    connected,
    connecting,
    account,
    name: walletName,
    adapter,
    select,
    disconnect: suietDisconnect,
    configuredWallets,
    detectedWallets,
    allAvailableWallets,
  } = useWallet();

  // Connect to a specific Sui wallet by name
  const connectWithSuiWallet = async (walletName?: string) => {
    setIsConnecting(true);
    setError(null);
    
    try {
      console.log("Available wallets:", { configuredWallets, detectedWallets, allAvailableWallets });
      
      // If no specific wallet name provided, try to connect to the first available wallet
      if (!walletName) {
        const availableWallets = [...configuredWallets, ...detectedWallets];
        const firstInstalledWallet = availableWallets.find(w => w.installed);
        
        if (!firstInstalledWallet) {
          throw new Error('No Sui wallets installed. Please install a Sui wallet extension.');
        }
        
        walletName = firstInstalledWallet.name;
      }

      console.log(`Connecting to wallet: ${walletName}`);
      
      // Use select method from @suiet/wallet-kit to connect to the specific wallet
      await select(walletName);
      
    } catch (err: any) {
      console.error('Wallet connection error:', err);
      setError(err.message || 'Failed to connect to wallet. Please try again.');
      setIsConnecting(false);
    }
  };

  const disconnectSuiWallet = async () => {
    setSuiWallet(null);
    
    // Disconnect from @suiet/wallet-kit if connected
    if (connected) {
      try {
        await suietDisconnect();
      } catch (err) {
        console.error('Error disconnecting from Sui wallet:', err);
      }
    }
    
    setError(null);
    localStorage.removeItem('wallet-connection');
  };

  // Get all available wallets (both configured and detected)
  const getAvailableWallets = () => {
    return [...configuredWallets, ...detectedWallets];
  };

  // Get only installed wallets
  const getInstalledWallets = () => {
    return getAvailableWallets().filter(wallet => wallet.installed);
  };

  // Load saved wallet connection on mount
  useEffect(() => {
    const savedWallet = localStorage.getItem('wallet-connection');
    if (savedWallet) {
      try {
        const walletData = JSON.parse(savedWallet);
        if (walletData.type === 'sui-wallet') {
          setSuiWallet(walletData);
        }
      } catch (err) {
        localStorage.removeItem('wallet-connection');
      }
    }
  }, []);

  // Listen to @suiet/wallet-kit connection changes
  useEffect(() => {
    setIsConnecting(connecting);
    
    if (connected && account && !suiWallet) {
      const walletConnection: WalletConnection = {
        address: account.address,
        type: 'sui-wallet',
        name: walletName || adapter?.name || 'Sui Wallet',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${walletName || 'suiwallet'}`
      };
      setSuiWallet(walletConnection);
      localStorage.setItem('wallet-connection', JSON.stringify(walletConnection));
      console.log("Successfully connected to wallet:", walletConnection);
      setIsConnecting(false);
    } else if (!connected && suiWallet?.type === 'sui-wallet') {
      // If wallet was disconnected externally, update our state
      setSuiWallet(null);
      localStorage.removeItem('wallet-connection');
    }
  }, [connected, connecting, account, walletName, adapter, suiWallet]);

  return {
    // Sui wallet state
    suiWallet,
    isConnecting: isConnecting || connecting,
    error,
    
    // Sui wallet methods
    connectWithSuiWallet,
    disconnectSuiWallet,
    
    // Wallet information
    getAvailableWallets,
    getInstalledWallets,
    configuredWallets,
    detectedWallets,
    allAvailableWallets,
    
    // @suiet/wallet-kit properties
    connected,
    account,
    walletName,
    adapter
  };
};