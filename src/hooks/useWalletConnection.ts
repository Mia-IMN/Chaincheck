import { useState, useEffect } from 'react';
import { useZkLogin } from './zklogin';
import { useConnectWallet } from './connectwallet';
import type { WalletConnection } from '../types';

export const useWalletConnection = () => {
  const [wallet, setWallet] = useState<WalletConnection | null>(null);

  // Use both hooks
  const zkLogin = useZkLogin();
  const connectWallet = useConnectWallet();

  // Combine connection states
  const isConnecting = zkLogin.isConnecting || connectWallet.isConnecting;
  const error = zkLogin.error || connectWallet.error;

  // Update main wallet state when either zkLogin or Sui wallet connects
  useEffect(() => {
    if (zkLogin.zkWallet) {
      setWallet(zkLogin.zkWallet);
    } else if (connectWallet.suiWallet) {
      setWallet(connectWallet.suiWallet);
    } else {
      setWallet(null);
    }
  }, [zkLogin.zkWallet, connectWallet.suiWallet]);

  // Unified disconnect function
  const disconnect = async () => {
    if (zkLogin.zkWallet) {
      zkLogin.disconnectZkLogin();
    }
    if (connectWallet.suiWallet) {
      await connectWallet.disconnectSuiWallet();
    }
    setWallet(null);
  };

  // Copy address utility
  const copyAddress = async () => {
    if (wallet?.address) {
      await navigator.clipboard.writeText(wallet.address);
    }
  };

  return {
    // Unified wallet state
    wallet,
    isConnecting,
    error,
    
    // Connection methods
    connectWithGoogle: zkLogin.connectWithGoogle,
    connectWithSuiWallet: connectWallet.connectWithSuiWallet,
    disconnect,
    copyAddress,
    handleOAuthCallback: zkLogin.handleOAuthCallback,
    
    // Wallet information
    getAvailableWallets: connectWallet.getAvailableWallets,
    getInstalledWallets: connectWallet.getInstalledWallets,
    configuredWallets: connectWallet.configuredWallets,
    detectedWallets: connectWallet.detectedWallets,
    allAvailableWallets: connectWallet.allAvailableWallets,
    
    // Individual wallet states (for debugging/advanced use)
    zkWallet: zkLogin.zkWallet,
    suiWallet: connectWallet.suiWallet,
    
    // @suiet/wallet-kit properties
    connected: connectWallet.connected,
    account: connectWallet.account,
    walletName: connectWallet.walletName,
    adapter: connectWallet.adapter
  };
};