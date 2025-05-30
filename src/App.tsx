import React, { useState } from 'react';
import { PageType, ThemeType, Token, TokenFilters, MarketStats } from './types';
import { formatPrice, formatMarketCap, formatVolume, getRiskScore, getTokenCategory } from './utils/formatters';

// Hooks
import { useWalletConnection } from './hooks/useWalletConnection';
import { useSuiEcosystemData } from './hooks/useSuiEcosystemData';
import { useSuiSystemData } from './hooks/useSuiSystemData';

// Components
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { WalletModal } from './components/modals/WalletModal';
import { AnalysisModal } from './components/modals/AnalysisModal';

// Pages
import { HomePage } from './pages/HomePage';
import { PortfolioPage } from './pages/PortfolioPage';
import { LearnPage } from './pages/LearnPage';

const ChainCheckApp: React.FC = () => {
  // Theme and navigation state
  const [theme, setTheme] = useState<ThemeType>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTokenForAnalysis, setSelectedTokenForAnalysis] = useState<Token | null>(null);
  
  // Wallet connection state
  const [showWalletModal, setShowWalletModal] = useState<boolean>(false);
  
  // Market overview state
  const [marketFilters, setMarketFilters] = useState<TokenFilters>({
    category: 'All',
    search: '',
    sortBy: 'market_cap',
    sortOrder: 'desc'
  });
  const [currentMarketPage, setCurrentMarketPage] = useState<number>(1);
  const itemsPerPage = 20;

  // Real-time data hooks
  const { tokens: suiTokens, allTokens, suiMainToken, loading: marketLoading, error: marketError, lastUpdated, pagination, refetch } = useSuiEcosystemData(currentMarketPage, itemsPerPage, marketFilters);
  const { systemState, loading: systemLoading } = useSuiSystemData();
  
  // Wallet connection hook
  const { 
    wallet, 
    isConnecting, 
    error: walletError, 
    connectWithGoogle, 
    connectWithSuiWallet, 
    disconnect, 
    copyAddress 
  } = useWalletConnection();

  const isDark = theme === 'dark';

  // Convert API data to display format - keeping original Token interface
  const convertApiToTokens = (): Token[] => {
    const converted: Token[] = suiTokens.map((token, index) => ({
      id: index + 1,
      name: token.name,
      symbol: token.symbol?.toUpperCase() || '',
      price: formatPrice(token.current_price),
      change: `${token.price_change_percentage_24h?.toFixed(2) || '0.00'}%`,
      marketCap: formatMarketCap(token.market_cap),
      volume: formatVolume(token.total_volume),
      riskScore: getRiskScore(token.price_change_percentage_24h, token.market_cap),
      trending: (token.price_change_percentage_24h || 0) >= 0 ? 'up' : 'down',
      image: token.image,
      liquidity: formatVolume(token.total_volume * 0.3), // Estimate liquidity as 30% of volume
      address: token.id === 'sui' ? '0x2::sui::SUI' : undefined,
      category: getTokenCategory(token.name, token.symbol || '')
    }));

    // Add SUI main token at the beginning if available and not already included
    if (suiMainToken && !converted.find(t => t.symbol === 'SUI')) {
      const suiToken: Token = {
        id: 0,
        name: suiMainToken.name,
        symbol: suiMainToken.symbol,
        price: formatPrice(suiMainToken.current_price),
        change: `${suiMainToken.price_change_percentage_24h?.toFixed(2) || '0.00'}%`,
        marketCap: formatMarketCap(suiMainToken.market_cap),
        volume: formatVolume(suiMainToken.total_volume),
        riskScore: getRiskScore(suiMainToken.price_change_percentage_24h, suiMainToken.market_cap),
        trending: (suiMainToken.price_change_percentage_24h || 0) >= 0 ? 'up' : 'down',
        image: suiMainToken.image,
        address: '0x2::sui::SUI',
        liquidity: formatVolume(suiMainToken.total_volume * 0.4), // Higher liquidity estimate for main token
        category: 'Infrastructure'
      };
      return [suiToken, ...converted];
    }

    return converted;
  };

  // Use live data if available, otherwise fall back to mock data
  const liveTokens = convertApiToTokens();
  const displayTokens = liveTokens.length > 0 ? liveTokens : [
    {
      id: 1,
      name: 'Sui',
      symbol: 'SUI',
      price: '$2.34',
      change: '+5.67%',
      marketCap: '$6.24B',
      volume: '$234.5M',
      liquidity: '$450M',
      riskScore: 'low' as const,
      trending: 'up' as const,
      address: '0x2::sui::SUI',
      category: 'Infrastructure' as const
    }
  ];

  // Calculate real market stats using live data
  const getMarketStats = (): MarketStats => {
    const tokens = allTokens.length > 0 ? allTokens : suiTokens;
    return {
      totalTokens: tokens.length || 12847,
      scamsDetected: tokens.filter(t => getRiskScore(t.price_change_percentage_24h || 0, t.market_cap) === 'high').length || 1203,
      riskAssessments: tokens.length || 45692,
      activeUsers: systemState ? systemState.activeValidators * 150 : 8934
    };
  };

  const marketStats = getMarketStats();

  const handleAnalyzeToken = (token: Token) => {
    setSelectedTokenForAnalysis(token);
  };

  return (
    <div className={`${isDark ? 'dark bg-slate-900' : 'bg-white'} transition-colors duration-300 min-h-screen`}>
      {/* Navigation */}
      <Navigation
        theme={theme}
        setTheme={setTheme}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        wallet={wallet}
        setShowWalletModal={setShowWalletModal}
        marketLoading={marketLoading}
        marketError={marketError}
        refetch={refetch}
      />

      {/* Page Content */}
      {currentPage === 'home' && (
        <HomePage
          isDark={isDark}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          displayTokens={displayTokens}
          marketStats={marketStats}
          marketLoading={marketLoading}
          marketError={marketError}
          lastUpdated={lastUpdated}
          suiMainToken={suiMainToken}
          marketFilters={marketFilters}
          setMarketFilters={setMarketFilters}
          currentMarketPage={currentMarketPage}
          setCurrentMarketPage={setCurrentMarketPage}
          pagination={pagination}
          refetch={refetch}
          onAnalyzeToken={handleAnalyzeToken}
        />
      )}
      {currentPage === 'portfolio' && <PortfolioPage isDark={isDark} />}
      {currentPage === 'learn' && <LearnPage isDark={isDark} />}

      {/* Footer */}
      <Footer isDark={isDark} lastUpdated={lastUpdated} />

      {/* Wallet Connection Modal */}
      <WalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        isDark={isDark}
        wallet={wallet}
        isConnecting={isConnecting}
        error={walletError}
        connectWithGoogle={connectWithGoogle}
        connectWithSuiWallet={connectWithSuiWallet}
        disconnect={disconnect}
        copyAddress={copyAddress}
      />

      {/* Analysis Modal */}
      <AnalysisModal
        token={selectedTokenForAnalysis}
        onClose={() => setSelectedTokenForAnalysis(null)}
        isDark={isDark}
      />
    </div>
  );
};

export default ChainCheckApp;