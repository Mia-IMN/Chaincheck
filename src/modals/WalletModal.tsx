import React, { useState } from 'react';
import { X, User, Wallet, Copy, ExternalLink, LogOut, AlertTriangle, RefreshCw, Download, ArrowLeft } from 'lucide-react';
import type { WalletConnection } from '../types';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  wallet: WalletConnection | null;
  isConnecting: boolean;
  error: string | null;
  connectWithGoogle: () => void;
  connectWithSuiWallet: (walletName?: string) => void;
  disconnect: () => void;
  copyAddress: () => void;
  getAvailableWallets: () => any[];
  getInstalledWallets: () => any[];
}

export const WalletModal: React.FC<WalletModalProps> = ({ 
  isOpen, 
  onClose, 
  isDark, 
  wallet, 
  isConnecting, 
  error, 
  connectWithGoogle, 
  connectWithSuiWallet, 
  disconnect,
  copyAddress,
  getAvailableWallets,
  // getInstalledWallets
}) => {
  const [showWalletList, setShowWalletList] = useState(false);

  if (!isOpen) return null;

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleViewOnExplorer = () => {
    if (wallet?.address) {
      const explorerUrl = `https://suiexplorer.com/address/${wallet.address}`;
      window.open(explorerUrl, '_blank');
    }
  };

  const handleWalletConnect = async (walletName: string, installed: boolean) => {
    if (!installed) {
      console.log(`${walletName} is not installed`);
      return;
    }
    
    try {
      await connectWithSuiWallet(walletName);
    } catch (err) {
      console.error(`Failed to connect to ${walletName}:`, err);
    }
  };

  const handleBackToMain = () => {
    setShowWalletList(false);
  };

  const handleContinueWithWallet = () => {
    setShowWalletList(true);
  };

  // Reset state when modal closes
  const handleClose = () => {
    setShowWalletList(false);
    onClose();
  };

  const availableWallets = getAvailableWallets();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={handleClose}></div>
        </div>

        <div className={`inline-block align-bottom rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${
          isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white'
        }`}>
          <div className={`px-6 py-4 border-b ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {showWalletList && !wallet && (
                  <button
                    onClick={handleBackToMain}
                    className={`p-1 rounded-lg transition-colors ${
                      isDark ? 'text-gray-400 hover:text-white hover:bg-slate-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                )}
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {wallet ? 'Wallet Connected' : showWalletList ? 'Choose Wallet' : 'Connect Wallet'}
                </h3>
              </div>
              <button
                onClick={handleClose}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'text-gray-400 hover:text-white hover:bg-slate-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="px-6 py-6">
            {error && (
              <div className={`mb-4 p-4 rounded-lg border ${
                isDark ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-red-50 border-red-200 text-red-600'
              }`}>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              </div>
            )}

            {wallet ? (
              // Connected State
              <div className="space-y-6">
                <div className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-700/50 border-slate-600' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    {wallet.type === 'zk-google' ? (
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <div>
                      <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {wallet.type === 'zk-google' ? 'Google (ZK Login)' : wallet.name}
                      </div>
                      {wallet.email && (
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {wallet.email}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                    Wallet Address
                  </div>
                  <div className="flex items-center gap-2">
                    <code className={`flex-1 p-2 rounded-lg text-sm font-mono ${
                      isDark ? 'bg-slate-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {formatAddress(wallet.address)}
                    </code>
                    <button
                      onClick={copyAddress}
                      className={`p-2 rounded-lg transition-colors ${
                        isDark ? 'text-gray-400 hover:text-white hover:bg-slate-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                      }`}
                      title="Copy address"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleViewOnExplorer}
                      className={`p-2 rounded-lg transition-colors ${
                        isDark ? 'text-gray-400 hover:text-white hover:bg-slate-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                      }`}
                      title="View on explorer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={disconnect}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                    isDark ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20' : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                  Disconnect Wallet
                </button>
              </div>
            ) : showWalletList ? (
              // Wallet List View
              <div className="space-y-4">
                <p className={`text-center mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Select a Sui wallet to connect
                </p>

                {availableWallets.length === 0 ? (
                  <div className={`text-center py-8 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    <Wallet className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">No Sui wallets detected</p>
                    <p className="text-sm">Please install a Sui wallet extension to continue</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {availableWallets.map((suiWallet) => (
                      <button
                        key={suiWallet.name}
                        onClick={() => handleWalletConnect(suiWallet.name, suiWallet.installed)}
                        disabled={isConnecting || !suiWallet.installed}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
                          suiWallet.installed
                            ? isDark 
                              ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white hover:scale-[1.01]' 
                              : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900 hover:shadow-sm hover:scale-[1.01]'
                            : isDark
                              ? 'bg-gray-800/50 border-gray-700 text-gray-500 cursor-not-allowed'
                              : 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                        } ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600">
                          {suiWallet.iconUrl ? (
                            <img 
                              src={suiWallet.iconUrl} 
                              alt={suiWallet.name} 
                              className="w-8 h-8"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                          ) : (
                            <Wallet className="w-6 h-6 text-white" />
                          )}
                          <Wallet className="w-6 h-6 text-white hidden" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-semibold">{suiWallet.name}</div>
                          <div className={`text-sm ${
                            suiWallet.installed 
                              ? isDark ? 'text-green-400' : 'text-green-600'
                              : isDark ? 'text-gray-500' : 'text-gray-400'
                          }`}>
                            {suiWallet.installed ? 'Ready to connect' : 'Not installed'}
                          </div>
                        </div>
                        {!suiWallet.installed && suiWallet.downloadUrl ? (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(suiWallet.downloadUrl.browserExtension, '_blank');
                            }}
                            className={`p-2 rounded-lg transition-colors ${
                              isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'
                            }`}
                            title="Install wallet"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                        ) : isConnecting ? (
                          <div className="animate-spin">
                            <RefreshCw className="w-5 h-5" />
                          </div>
                        ) : null}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Main Connection Options
              <div className="space-y-4">
                <p className={`text-center mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Choose your preferred connection method
                </p>

                {/* Google zkLogin Option */}
                <button
                  onClick={connectWithGoogle}
                  disabled={isConnecting}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                    isDark 
                      ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' 
                      : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900 hover:shadow-md'
                  } ${isConnecting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">Continue with Google</div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Zero-knowledge login with Google account
                    </div>
                  </div>
                  {isConnecting && (
                    <div className="animate-spin">
                      <RefreshCw className="w-5 h-5" />
                    </div>
                  )}
                </button>

                {/* Continue with Wallet Option */}
                <button
                  onClick={handleContinueWithWallet}
                  disabled={isConnecting}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                    isDark 
                      ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' 
                      : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900 hover:shadow-md'
                  } ${isConnecting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">Continue with Wallet</div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Connect your Sui wallet to ChainCheck
                    </div>
                  </div>
                </button>

                <div className={`text-xs text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  By connecting a wallet, you agree to ChainCheck's Terms of Service and Privacy Policy
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};