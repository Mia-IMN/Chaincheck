"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const formatters_1 = require("./utils/formatters");
// Hooks
const useWalletConnection_1 = require("./hooks/useWalletConnection");
const useSuiEcosystemData_1 = require("./hooks/useSuiEcosystemData");
const useSuiSystemData_1 = require("./hooks/useSuiSystemData");
// Components
const Navigation_1 = require("./components/layout/Navigation");
const Footer_1 = require("./components/layout/Footer");
const WalletModal_1 = require("./components/modals/WalletModal");
const AnalysisModal_1 = require("./components/modals/AnalysisModal");
// Pages
const HomePage_1 = require("./pages/HomePage");
const PortfolioPage_1 = require("./pages/PortfolioPage");
const LearnPage_1 = require("./pages/LearnPage");
const ChainCheckApp = () => {
    // Theme and navigation state
    const [theme, setTheme] = (0, react_1.useState)('light');
    const [mobileMenuOpen, setMobileMenuOpen] = (0, react_1.useState)(false);
    const [currentPage, setCurrentPage] = (0, react_1.useState)('home');
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const [selectedTokenForAnalysis, setSelectedTokenForAnalysis] = (0, react_1.useState)(null);
    // Wallet connection state
    const [showWalletModal, setShowWalletModal] = (0, react_1.useState)(false);
    // Market overview state
    const [marketFilters, setMarketFilters] = (0, react_1.useState)({
        category: 'All',
        search: '',
        sortBy: 'market_cap',
        sortOrder: 'desc'
    });
    const [currentMarketPage, setCurrentMarketPage] = (0, react_1.useState)(1);
    const itemsPerPage = 20;
    // Real-time data hooks
    const { tokens: suiTokens, allTokens, suiMainToken, loading: marketLoading, error: marketError, lastUpdated, pagination, refetch } = (0, useSuiEcosystemData_1.useSuiEcosystemData)(currentMarketPage, itemsPerPage, marketFilters);
    const { systemState, loading: systemLoading } = (0, useSuiSystemData_1.useSuiSystemData)();
    // Wallet connection hook
    const { wallet, isConnecting, error: walletError, connectWithGoogle, connectWithSuiWallet, disconnect, copyAddress } = (0, useWalletConnection_1.useWalletConnection)();
    const isDark = theme === 'dark';
    // Convert API data to display format - keeping original Token interface
    const convertApiToTokens = () => {
        var _a;
        const converted = suiTokens.map((token, index) => {
            var _a, _b;
            return ({
                id: index + 1,
                name: token.name,
                symbol: ((_a = token.symbol) === null || _a === void 0 ? void 0 : _a.toUpperCase()) || '',
                price: (0, formatters_1.formatPrice)(token.current_price),
                change: `${((_b = token.price_change_percentage_24h) === null || _b === void 0 ? void 0 : _b.toFixed(2)) || '0.00'}%`,
                marketCap: (0, formatters_1.formatMarketCap)(token.market_cap),
                volume: (0, formatters_1.formatVolume)(token.total_volume),
                riskScore: (0, formatters_1.getRiskScore)(token.price_change_percentage_24h, token.market_cap),
                trending: (token.price_change_percentage_24h || 0) >= 0 ? 'up' : 'down',
                image: token.image,
                liquidity: (0, formatters_1.formatVolume)(token.total_volume * 0.3), // Estimate liquidity as 30% of volume
                address: token.id === 'sui' ? '0x2::sui::SUI' : undefined,
                category: (0, formatters_1.getTokenCategory)(token.name, token.symbol || '')
            });
        });
        // Add SUI main token at the beginning if available and not already included
        if (suiMainToken && !converted.find(t => t.symbol === 'SUI')) {
            const suiToken = {
                id: 0,
                name: suiMainToken.name,
                symbol: suiMainToken.symbol,
                price: (0, formatters_1.formatPrice)(suiMainToken.current_price),
                change: `${((_a = suiMainToken.price_change_percentage_24h) === null || _a === void 0 ? void 0 : _a.toFixed(2)) || '0.00'}%`,
                marketCap: (0, formatters_1.formatMarketCap)(suiMainToken.market_cap),
                volume: (0, formatters_1.formatVolume)(suiMainToken.total_volume),
                riskScore: (0, formatters_1.getRiskScore)(suiMainToken.price_change_percentage_24h, suiMainToken.market_cap),
                trending: (suiMainToken.price_change_percentage_24h || 0) >= 0 ? 'up' : 'down',
                image: suiMainToken.image,
                address: '0x2::sui::SUI',
                liquidity: (0, formatters_1.formatVolume)(suiMainToken.total_volume * 0.4), // Higher liquidity estimate for main token
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
            riskScore: 'low',
            trending: 'up',
            address: '0x2::sui::SUI',
            category: 'Infrastructure'
        }
    ];
    // Calculate real market stats using live data
    const getMarketStats = () => {
        const tokens = allTokens.length > 0 ? allTokens : suiTokens;
        return {
            totalTokens: tokens.length || 12847,
            scamsDetected: tokens.filter(t => (0, formatters_1.getRiskScore)(t.price_change_percentage_24h || 0, t.market_cap) === 'high').length || 1203,
            riskAssessments: tokens.length || 45692,
            activeUsers: systemState ? systemState.activeValidators * 150 : 8934
        };
    };
    const marketStats = getMarketStats();
    const handleAnalyzeToken = (token) => {
        setSelectedTokenForAnalysis(token);
    };
    return (<div className={`${isDark ? 'dark bg-slate-900' : 'bg-white'} transition-colors duration-300 min-h-screen`}>
      {/* Navigation */}
      <Navigation_1.Navigation theme={theme} setTheme={setTheme} currentPage={currentPage} setCurrentPage={setCurrentPage} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} wallet={wallet} setShowWalletModal={setShowWalletModal} marketLoading={marketLoading} marketError={marketError} refetch={refetch}/>

      {/* Page Content */}
      {currentPage === 'home' && (<HomePage_1.HomePage isDark={isDark} searchQuery={searchQuery} setSearchQuery={setSearchQuery} displayTokens={displayTokens} marketStats={marketStats} marketLoading={marketLoading} marketError={marketError} lastUpdated={lastUpdated} suiMainToken={suiMainToken} marketFilters={marketFilters} setMarketFilters={setMarketFilters} currentMarketPage={currentMarketPage} setCurrentMarketPage={setCurrentMarketPage} pagination={pagination} refetch={refetch} onAnalyzeToken={handleAnalyzeToken}/>)}
      {currentPage === 'portfolio' && <PortfolioPage_1.PortfolioPage isDark={isDark}/>}
      {currentPage === 'learn' && <LearnPage_1.LearnPage isDark={isDark}/>}

      {/* Footer */}
      <Footer_1.Footer isDark={isDark} lastUpdated={lastUpdated}/>

      {/* Wallet Connection Modal */}
      <WalletModal_1.WalletModal isOpen={showWalletModal} onClose={() => setShowWalletModal(false)} isDark={isDark} wallet={wallet} isConnecting={isConnecting} error={walletError} connectWithGoogle={connectWithGoogle} connectWithSuiWallet={connectWithSuiWallet} disconnect={disconnect} copyAddress={copyAddress}/>

      {/* Analysis Modal */}
      <AnalysisModal_1.AnalysisModal token={selectedTokenForAnalysis} onClose={() => setSelectedTokenForAnalysis(null)} isDark={isDark}/>
    </div>);
};
exports.default = ChainCheckApp;
