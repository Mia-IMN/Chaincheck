import { useState } from 'react';
import { Navigation } from './layout/navigation';
import { WalletModal } from './modals/WalletModal'; // Adjust path as needed
import { useWalletConnection } from './hooks/useWalletConnection'; // Adjust path as needed
import './App.css';
import type { PageType, ThemeType, Token } from './types/index';

const ChainCheckApp: React.FC = () => {
  // Theme and navigation state
  const [theme, setTheme] = useState<ThemeType>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedTokenForAnalysis, setSelectedTokenForAnalysis] = useState<Token | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showWalletModal, setShowWalletModal] = useState<boolean>(false);

  // Use the wallet connection hook
  const {
    wallet,
    isConnecting,
    error,
    connectWithGoogle,
    connectWithSuiWallet,
    disconnect,
    copyAddress,
    getAvailableWallets,
    getInstalledWallets
  } = useWalletConnection();

  // Mock data for market (you can replace with real data)
  const [marketLoading] = useState(false);
  const [marketError] = useState<string | null>(null);

  const refetch = () => {
    // Implement your data refetch logic here
    console.log('Refetching data...');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'
    }`}>
      <Navigation
        theme={theme}
        setTheme={setTheme}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showWalletModal={showWalletModal}
        setShowWalletModal={setShowWalletModal}
        selectedTokenForAnalysis={selectedTokenForAnalysis}
        setSelectedTokenForAnalysis={setSelectedTokenForAnalysis}
        wallet={wallet}
        marketLoading={marketLoading}
        marketError={marketError}
        refetch={refetch}
      />

      {/* Wallet Modal */}
      <WalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        isDark={theme === 'dark'}
        wallet={wallet}
        isConnecting={isConnecting}
        error={error}
        connectWithGoogle={connectWithGoogle}
        connectWithSuiWallet={connectWithSuiWallet}
        disconnect={disconnect}
        copyAddress={copyAddress}
        getAvailableWallets={getAvailableWallets}
        getInstalledWallets={getInstalledWallets}
      />

      {/* Main content area */}
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {currentPage === 'home' && (
            <div className={`text-center py-20 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <h1 className="text-4xl font-bold mb-4">Welcome to ChainCheck</h1>
              <p className="text-xl text-gray-500 mb-8">
                Your comprehensive blockchain analytics platform
              </p>
              {wallet ? (
                <div className={`p-6 rounded-xl border max-w-md mx-auto ${
                  theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
                }`}>
                  <h3 className="text-lg font-semibold mb-2">Connected Wallet</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {wallet.type === 'zk-google' ? 'Google ZK Login' : 'Sui Wallet'}
                  </p>
                  <code className={`text-sm p-2 rounded ${
                    theme === 'dark' ? 'bg-slate-700' : 'bg-gray-100'
                  }`}>
                    {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                  </code>
                </div>
              ) : (
                <button
                  onClick={() => setShowWalletModal(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Connect Wallet to Get Started
                </button>
              )}
            </div>
          )}

          {currentPage === 'portfolio' && (
            <div className={`text-center py-20 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <h1 className="text-4xl font-bold mb-4">Portfolio Manager</h1>
              <p className="text-xl text-gray-500">
                Manage your crypto portfolio here
              </p>
            </div>
          )}

          {currentPage === 'learn' && (
            <div className={`text-center py-20 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <h1 className="text-4xl font-bold mb-4">Learn</h1>
              <p className="text-xl text-gray-500">
                Educational resources and tutorials
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ChainCheckApp;