"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenModal = void 0;
const react_1 = __importDefault(require("react"));
const lucide_react_1 = require("lucide-react");
const formatters_1 = require("../../utils/formatters");
const TokenModal = ({ token, onClose, isDark, onAnalyze }) => (<div className="fixed inset-0 z-50 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
      </div>

      <div className={`inline-block align-bottom rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white'}`}>
        <div className={`px-6 py-4 border-b ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {token.image ? (<img src={token.image} alt={token.symbol} className="w-12 h-12 rounded-xl"/>) : (<div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg
                  ${token.symbol === 'SUI' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
            token.symbol === 'CETUS' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                token.symbol === 'TURBOS' ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' :
                    token.symbol === 'DEEP' ? 'bg-gradient-to-br from-orange-500 to-orange-600' :
                        'bg-gradient-to-br from-pink-500 to-pink-600'}`}>
                  {token.symbol.slice(0, 2)}
                </div>)}
              <div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {token.name}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {token.symbol}
                </p>
              </div>
            </div>
            <button onClick={onClose} className={`p-2 rounded-lg transition-colors ${isDark ? 'text-gray-400 hover:text-white hover:bg-slate-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>
              <lucide_react_1.X className="h-5 w-5"/>
            </button>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Current Price</div>
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {token.price}
              </div>
            </div>
            <div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>24h Change</div>
              <div className={`text-2xl font-bold flex items-center space-x-2 ${token.trending === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                {token.trending === 'up' ? (<lucide_react_1.TrendingUp className="h-6 w-6"/>) : (<lucide_react_1.TrendingDown className="h-6 w-6"/>)}
                <span>{token.change}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Market Cap</div>
              <div className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {token.marketCap}
              </div>
            </div>
            <div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>24h Volume</div>
              <div className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {token.volume}
              </div>
            </div>
          </div>

          {token.liquidity && (<div className="mb-6">
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Estimated Liquidity</div>
              <div className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {token.liquidity}
              </div>
            </div>)}

          {token.address && (<div className="mb-6">
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Contract Address</div>
              <div className={`p-3 rounded-lg font-mono text-sm break-all ${isDark ? 'bg-slate-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                {token.address}
              </div>
            </div>)}

          <div className="mb-6">
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Risk Assessment</div>
            <div className="flex items-center space-x-3">
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${(0, formatters_1.getRiskBadge)(token.riskScore)}`}>
                {token.riskScore.toUpperCase()} RISK
              </span>
              {token.riskScore === 'low' && <lucide_react_1.CheckCircle className="h-5 w-5 text-emerald-400"/>}
              {token.riskScore === 'medium' && <lucide_react_1.AlertTriangle className="h-5 w-5 text-amber-400"/>}
              {token.riskScore === 'high' && <lucide_react_1.XCircle className="h-5 w-5 text-red-400"/>}
            </div>
          </div>

          {token.category && (<div className="mb-6">
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Category</div>
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${token.category === 'DeFi' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
            token.category === 'Gaming' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                token.category === 'Infrastructure' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                {token.category}
              </span>
            </div>)}

          <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <strong>Risk Assessment:</strong> Based on price volatility, market cap, trading volume, and liquidity metrics. 
              This automated analysis should not be considered financial advice.
            </div>
          </div>
        </div>

        <div className={`px-6 py-4 border-t ${isDark ? 'border-slate-700 bg-slate-700/30' : 'border-gray-200 bg-gray-50'}`}>
          <div className="flex space-x-3">
            <button onClick={onClose} className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${isDark ? 'bg-slate-600 hover:bg-slate-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`}>
              Close
            </button>
            <button onClick={() => {
        onAnalyze(token);
        onClose();
    }} className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-[1.02] transition-all duration-200">
              Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>);
exports.TokenModal = TokenModal;
