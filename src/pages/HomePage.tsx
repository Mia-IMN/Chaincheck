import React, { useState } from 'react';
import { Search, TrendingUp, TrendingDown, ArrowUpRight, Activity, BarChart3, Zap, ChevronRight, RefreshCw, Shield, Globe } from 'lucide-react';
import { Token, Feature, SuiTokenData, MarketStats, TokenFilters } from '../types';
import { formatPrice, formatMarketCap, formatVolume, formatSupply, getRiskBadge } from '../utils/formatters';
import { Pagination } from '../components/ui/Pagination';
import { TokenModal } from '../components/modals/TokenModal';

interface HomePageProps {
  isDark: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  displayTokens: Token[];
  marketStats: MarketStats;
  marketLoading: boolean;
  marketError: string | null;
  lastUpdated: Date | null;
  suiMainToken: SuiTokenData | null;
  marketFilters: TokenFilters;
  setMarketFilters: React.Dispatch<React.SetStateAction<TokenFilters>>;
  currentMarketPage: number;
  setCurrentMarketPage: (page: number) => void;
  pagination: any;
  refetch: () => void;
  onAnalyzeToken: (token: Token) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  isDark,
  searchQuery,
  setSearchQuery,
  displayTokens,
  marketStats,
  marketLoading,
  marketError,
  lastUpdated,
  suiMainToken,
  marketFilters,
  setMarketFilters,
  currentMarketPage,
  setCurrentMarketPage,
  pagination,
  refetch,
  onAnalyzeToken
}) => {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  const features: Feature[] = [
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Real-Time Analytics",
      description: "Advanced on-chain analysis with millisecond precision data aggregation",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security Assessment",
      description: "Multi-layer security analysis using machine learning algorithms",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Smart Automation",
      description: "Automated risk scoring and portfolio optimization strategies",
      gradient: "from-emerald-500/20 to-teal-500/20"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Sui Ecosystem",
      description: "Native integration with Sui blockchain and Move smart contracts",
      gradient: "from-orange-500/20 to-red-500/20"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`relative pt-32 pb-24 px-6 overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
          : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
      }`}>
        {/* Glassmorphic background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${
            isDark ? 'bg-blue-500' : 'bg-blue-400'
          }`}></div>
          <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            isDark ? 'bg-purple-500' : 'bg-purple-400'
          }`}></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Header badge with live status */}
          <div className="flex justify-center mb-8">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm ${
              isDark 
                ? 'bg-white/5 border-white/10 text-white' 
                : 'bg-black/5 border-black/10 text-gray-900'
            }`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                marketLoading ? 'bg-yellow-400' : marketError ? 'bg-red-400' : 'bg-green-400'
              }`}></div>
              <span className="text-sm font-medium">
                {marketLoading ? 'Connecting to Sui Mainnet...' : 'Live on Sui Mainnet'}
              </span>
              {lastUpdated && (
                <span className="text-xs opacity-70">
                  • Updated {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className={`text-5xl md:text-7xl font-bold mb-8 leading-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              <span className="block mb-2"> Advanced Token</span>
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Analysis
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl mb-12 leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            } max-w-3xl mx-auto`}>
              Professional-grade risk assessment and token analysis platform 
              for Sui blockchain
            </p>

            {/* Professional search interface */}
            <div className="relative max-w-3xl mx-auto mb-16">
              <div className={`relative backdrop-blur-xl rounded-2xl border p-2 ${
                isDark 
                  ? 'bg-white/10 border-white/20' 
                  : 'bg-white/80 border-gray-200/50'
              } shadow-2xl`}>
                <div className="flex items-center">
                  <div className="flex-1 flex items-center">
                    <Search className={`ml-6 mr-4 w-6 h-6 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`} />
                    <input
                      type="text"
                      placeholder="Enter token address or symbol (e.g., 0x2::sui::SUI)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`flex-1 py-4 bg-transparent ${
                        isDark ? 'text-white placeholder-slate-400' : 'text-gray-900 placeholder-slate-500'
                      } focus:outline-none text-lg font-medium`}
                    />
                  </div>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                    <span>Analyze Token</span>
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick stats with live data */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className={`text-2xl md:text-3xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {marketLoading ? '...' : marketStats.totalTokens.toLocaleString()}
                </div>
                <div className={`text-sm ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Tokens Analyzed
                </div>
              </div>
              <div className="text-center">
                <div className={`text-2xl md:text-3xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {marketLoading ? '...' : marketStats.scamsDetected.toLocaleString()}
                </div>
                <div className={`text-sm ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Scams Detected
                </div>
              </div>
              <div className="text-center">
                <div className={`text-2xl md:text-3xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {marketLoading ? '...' : marketStats.riskAssessments.toLocaleString()}
                </div>
                <div className={`text-sm ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Risk Assessments
                </div>
              </div>
              <div className="text-center">
                <div className={`text-2xl md:text-3xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {marketLoading ? '...' : marketStats.activeUsers.toLocaleString()}
                </div>
                <div className={`text-sm ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Active Users
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Market Data Section */}
      <section className={`py-20 px-6 ${
        isDark ? 'bg-slate-900/50' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className={`text-3xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Live Market Intelligence
              </h2>
              <p className={`${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Real-time analysis of top Sui ecosystem tokens
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={refetch}
                disabled={marketLoading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDark 
                    ? 'text-blue-400 hover:bg-blue-500/10' 
                    : 'text-blue-600 hover:bg-blue-50'
                } ${marketLoading ? 'animate-spin' : ''}`}
                title="Refresh market data"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                isDark 
                  ? 'text-blue-400 hover:bg-blue-500/10' 
                  : 'text-blue-600 hover:bg-blue-50'
              } transition-colors duration-200`}>
                <span>View All</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Market cards display here - same as original but extracted */}
          {marketLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`p-6 rounded-2xl backdrop-blur-sm border animate-pulse ${
                  isDark 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl ${
                      isDark ? 'bg-slate-700' : 'bg-gray-300'
                    }`}></div>
                    <div>
                      <div className={`h-4 w-16 rounded mb-2 ${
                        isDark ? 'bg-slate-700' : 'bg-gray-300'
                      }`}></div>
                      <div className={`h-3 w-20 rounded ${
                        isDark ? 'bg-slate-800' : 'bg-gray-200'
                      }`}></div>
                    </div>
                  </div>
                  <div className={`h-6 w-24 rounded mb-2 ${
                    isDark ? 'bg-slate-700' : 'bg-gray-300'
                  }`}></div>
                  <div className={`h-4 w-16 rounded ${
                    isDark ? 'bg-slate-800' : 'bg-gray-200'
                  }`}></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayTokens.slice(0, 4).map((token, index) => (
                <div 
                  key={token.id}
                  className={`group p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 cursor-pointer ${
                    isDark 
                      ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
                      : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedToken(token)}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      {token.image ? (
                        <img src={token.image} alt={token.symbol} className="w-12 h-12 rounded-xl" />
                      ) : (
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm
                          ${token.symbol === 'SUI' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                            token.symbol === 'CETUS' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                            token.symbol === 'TURBOS' ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' :
                            token.symbol === 'DEEP' ? 'bg-gradient-to-br from-orange-500 to-orange-600' :
                            'bg-gradient-to-br from-pink-500 to-pink-600'}`}>
                          {token.symbol.slice(0, 2)}
                        </div>
                      )}
                      <div>
                        <div className={`font-semibold ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {token.symbol}
                        </div>
                        <div className={`text-sm ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          {token.name}
                        </div>
                      </div>
                    </div>
                    <div className={`p-2 rounded-lg ${
                      token.trending === 'up' 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-red-500/10 text-red-400'
                    }`}>
                      {token.trending === 'up' ? 
                        <TrendingUp className="w-4 h-4" /> : 
                        <TrendingDown className="w-4 h-4" />
                      }
                    </div>
                  </div>
                  
                  <div className={`text-2xl font-bold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {token.price}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-2 text-sm font-medium ${
                      token.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      <span>{token.change}</span>
                    </div>
                    <div className={`px-2 py-1 rounded-md text-xs border ${getRiskBadge(token.riskScore)}`}>
                      {token.riskScore.toUpperCase()}
                    </div>
                  </div>
                  
                  <div className={`mt-4 pt-4 border-t ${
                    isDark ? 'border-white/10' : 'border-gray-200'
                  }`}>
                    <div className="flex justify-between text-sm">
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                        Volume
                      </span>
                      <span className={isDark ? 'text-white' : 'text-gray-900'}>
                        {token.volume}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Additional live stats if SUI data is available */}
          {suiMainToken && !marketLoading && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`p-6 rounded-2xl backdrop-blur-sm border ${
                isDark 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${
                    isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      SUI Live Price
                    </div>
                    <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {formatPrice(suiMainToken.current_price)}
                    </div>
                    <div className={`text-sm flex items-center gap-1 ${
                      (suiMainToken.price_change_percentage_24h || 0) >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {(suiMainToken.price_change_percentage_24h || 0) >= 0 ? 
                        <TrendingUp className="w-4 h-4" /> : 
                        <TrendingDown className="w-4 h-4" />
                      }
                      <span>{suiMainToken.price_change_percentage_24h?.toFixed(2) || '0.00'}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-2xl backdrop-blur-sm border ${
                isDark 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${
                    isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                  }`}>
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Market Cap
                    </div>
                    <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {formatMarketCap(suiMainToken.market_cap)}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Rank #{suiMainToken.market_cap_rank}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-2xl backdrop-blur-sm border ${
                isDark 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${
                    isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      24h Volume
                    </div>
                    <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {formatVolume(suiMainToken.total_volume)}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Supply: {formatSupply(suiMainToken.circulating_supply || 0)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-24 px-6 relative overflow-hidden ${
        isDark ? 'bg-slate-800/50' : 'bg-slate-50/50'
      }`}>
        <div className="absolute inset-0">
          <div className={`absolute top-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-10 ${
            isDark ? 'bg-blue-500' : 'bg-blue-400'
          }`}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Enterprise-Grade Platform
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Built for institutional investors, DeFi protocols, and sophisticated traders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group p-8 rounded-2xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 cursor-pointer ${
                  isDark 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                    : 'bg-white/80 border-gray-200 hover:bg-white hover:shadow-xl'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} border ${
                  isDark ? 'border-white/20' : 'border-gray-200'
                } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={isDark ? 'text-white' : 'text-gray-700'}>
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className={`text-xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                
                <p className={`leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Data Table */}
      <section className={`py-24 px-6 ${
        isDark ? 'bg-slate-900' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className={`text-3xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Market Overview
            </h2>
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  placeholder="Search tokens..."
                  value={marketFilters.search}
                  onChange={(e) => {
                    setMarketFilters(prev => ({ ...prev, search: e.target.value }));
                    setCurrentMarketPage(1);
                  }}
                  className={`pl-10 pr-4 py-2 w-64 rounded-lg border text-sm ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              
              {/* Category Filter */}
              <select 
                value={marketFilters.category}
                onChange={(e) => {
                  setMarketFilters(prev => ({ ...prev, category: e.target.value }));
                  setCurrentMarketPage(1);
                }}
                className={`px-4 py-2 rounded-lg border text-sm ${
                  isDark 
                    ? 'bg-slate-800 border-slate-700 text-white' 
                    : 'bg-white border-gray-200 text-gray-900'
                }`}
              >
                <option value="All">All Tokens</option>
                <option value="DeFi">DeFi</option>
                <option value="Gaming">Gaming</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="NFT">NFT</option>
              </select>
              
              {/* Sort Options */}
              <select
                value={`${marketFilters.sortBy}-${marketFilters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-') as [typeof marketFilters.sortBy, typeof marketFilters.sortOrder];
                  setMarketFilters(prev => ({ ...prev, sortBy, sortOrder }));
                }}
                className={`px-4 py-2 rounded-lg border text-sm ${
                  isDark 
                    ? 'bg-slate-800 border-slate-700 text-white' 
                    : 'bg-white border-gray-200 text-gray-900'
                }`}
              >
                <option value="market_cap-desc">Market Cap ↓</option>
                <option value="market_cap-asc">Market Cap ↑</option>
                <option value="volume-desc">Volume ↓</option>
                <option value="volume-asc">Volume ↑</option>
                <option value="price_change_percentage_24h-desc">Change ↓</option>
                <option value="price_change_percentage_24h-asc">Change ↑</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
              </select>
            </div>
          </div>
          
          <div className={`rounded-2xl border backdrop-blur-sm overflow-hidden ${
            isDark 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white border-gray-200'
          }`}>
            {/* Table Header with Results Info */}
            <div className={`px-6 py-4 border-b ${isDark ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
              <div className="flex items-center justify-between">
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {marketLoading ? (
                    'Loading tokens...'
                  ) : (
                    `Showing ${((currentMarketPage - 1) * 20) + 1}-${Math.min(currentMarketPage * 20, pagination.totalItems)} of ${pagination.totalItems} tokens`
                  )}
                </div>
                <button
                  onClick={refetch}
                  disabled={marketLoading}
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    isDark 
                      ? 'text-blue-400 hover:bg-blue-500/10' 
                      : 'text-blue-600 hover:bg-blue-50'
                  } ${marketLoading ? 'animate-spin' : ''}`}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${
                  isDark ? 'bg-white/5' : 'bg-gray-50'
                }`}>
                  <tr>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      Asset
                    </th>
                    <th className={`px-6 py-4 text-right text-sm font-semibold ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      Price
                    </th>
                    <th className={`px-6 py-4 text-right text-sm font-semibold ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      24h Change
                    </th>
                    <th className={`px-6 py-4 text-right text-sm font-semibold ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      Market Cap
                    </th>
                    <th className={`px-6 py-4 text-right text-sm font-semibold ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      Volume
                    </th>
                    <th className={`px-6 py-4 text-center text-sm font-semibold ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      Category
                    </th>
                    <th className={`px-6 py-4 text-center text-sm font-semibold ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      Risk Score
                    </th>
                    <th className={`px-6 py-4 text-center text-sm font-semibold ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {marketLoading ? (
                    Array.from({ length: 10 }).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}></div>
                            <div>
                              <div className={`h-4 w-24 rounded mb-2 ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}></div>
                              <div className={`h-3 w-16 rounded ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`}></div>
                            </div>
                          </div>
                        </td>
                        {Array.from({ length: 7 }).map((_, j) => (
                          <td key={j} className="px-6 py-4">
                            <div className={`h-4 w-16 rounded mx-auto ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}></div>
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : displayTokens.length > 0 ? (
                    displayTokens.map((token, index) => (
                      <tr 
                        key={token.id} 
                        className={`border-t transition-colors duration-200 cursor-pointer ${
                          isDark 
                            ? 'border-white/10 hover:bg-white/5' 
                            : 'border-gray-100 hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedToken(token)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            {token.image ? (
                              <img src={token.image} alt={token.symbol} className="w-10 h-10 rounded-xl" />
                            ) : (
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm
                                ${token.symbol === 'SUI' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                                  token.symbol === 'CETUS' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                                  token.symbol === 'TURBOS' ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' :
                                  token.symbol === 'DEEP' ? 'bg-gradient-to-br from-orange-500 to-orange-600' :
                                  'bg-gradient-to-br from-pink-500 to-pink-600'}`}>
                                {token.symbol.slice(0, 2)}
                              </div>
                            )}
                            <div>
                              <div className={`font-semibold ${
                                isDark ? 'text-white' : 'text-gray-900'
                              }`}>
                                {token.name}
                              </div>
                              <div className={`text-sm ${
                                isDark ? 'text-slate-400' : 'text-slate-500'
                              }`}>
                                {token.symbol}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className={`px-6 py-4 text-right font-semibold ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {token.price}
                        </td>
                        <td className={`px-6 py-4 text-right font-medium ${
                          token.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          <div className="flex items-center justify-end gap-1">
                            {token.trending === 'up' ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                            {token.change}
                          </div>
                        </td>
                        <td className={`px-6 py-4 text-right ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          {token.marketCap}
                        </td>
                        <td className={`px-6 py-4 text-right ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          {token.volume}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {token.category && (
                            <span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium border ${
                              token.category === 'DeFi' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                              token.category === 'Gaming' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                              token.category === 'Infrastructure' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                              token.category === 'NFT' ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' :
                              'bg-gray-500/10 text-gray-400 border-gray-500/20'
                            }`}>
                              {token.category}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRiskBadge(token.riskScore)}`}>
                            {token.riskScore.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onAnalyzeToken(token);
                            }}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-200"
                          >
                            Analysis
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className={`px-6 py-12 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {marketFilters.search || marketFilters.category !== 'All' 
                          ? 'No tokens found matching your criteria.' 
                          : 'No token data available.'
                        }
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <Pagination 
              currentPage={currentMarketPage}
              totalPages={pagination.totalPages}
              onPageChange={setCurrentMarketPage}
              isDark={isDark}
            />
          </div>
        </div>
      </section>

      {/* Token Modal */}
      {selectedToken && (
        <TokenModal 
          token={selectedToken} 
          onClose={() => setSelectedToken(null)} 
          isDark={isDark}
          onAnalyze={onAnalyzeToken}
        />
      )}
    </div>
  );
};