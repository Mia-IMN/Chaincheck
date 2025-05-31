"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisModal = void 0;
const react_1 = __importDefault(require("react"));
const lucide_react_1 = require("lucide-react");
const useTokenAnalysis_1 = require("../../hooks/useTokenAnalysis");
const Tooltip_1 = require("../ui/Tooltip");
const formatters_1 = require("../../utils/formatters");
const AnalysisModal = ({ token, onClose, isDark }) => {
    const { analysis, loading } = (0, useTokenAnalysis_1.useTokenAnalysis)(token);
    if (!token)
        return null;
    return (<div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>

        <div className={`inline-block align-bottom rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-100'}`}>
          {/* Header */}
          <div className={`px-8 py-6 border-b ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-gray-100 bg-gray-50/50'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {token.image ? (<img src={token.image} alt={token.symbol} className="w-16 h-16 rounded-2xl"/>) : (<div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl
                    ${token.symbol === 'SUI' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                token.symbol === 'CETUS' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                    token.symbol === 'TURBOS' ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' :
                        token.symbol === 'DEEP' ? 'bg-gradient-to-br from-orange-500 to-orange-600' :
                            'bg-gradient-to-br from-pink-500 to-pink-600'}`}>
                    {token.symbol.slice(0, 2)}
                  </div>)}
                <div>
                  <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {token.name} Analysis
                  </h2>
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`text-lg font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {token.symbol}
                    </span>
                    <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {token.price}
                    </span>
                    <span className={`flex items-center gap-1 text-lg font-medium ${token.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                      {token.trending === 'up' ? <lucide_react_1.TrendingUp className="w-5 h-5"/> : <lucide_react_1.TrendingDown className="w-5 h-5"/>}
                      {token.change}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {analysis && (<div className="text-right">
                    <div className={`text-4xl font-bold ${analysis.riskLevel === 'low' ? 'text-emerald-400' :
                analysis.riskLevel === 'medium' ? 'text-amber-400' : 'text-red-400'}`}>
                      {analysis.trustScore}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Trust Score
                    </div>
                  </div>)}
                <button onClick={onClose} className={`p-3 rounded-xl transition-colors ${isDark ? 'text-gray-400 hover:text-white hover:bg-slate-800' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>
                  <lucide_react_1.X className="h-6 w-6"/>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-h-[80vh] overflow-y-auto">
            {loading ? (<div className="p-12 text-center">
                <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"></div>
                <div className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Analyzing {token.symbol}...
                </div>
                <div className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Performing comprehensive risk assessment
                </div>
              </div>) : analysis ? (<div className="p-8">
                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-xl ${analysis.riskLevel === 'low' ? 'bg-emerald-500/20 text-emerald-400' :
                analysis.riskLevel === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}>
                        <lucide_react_1.Shield className="w-6 h-6"/>
                      </div>
                      <div>
                        <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Risk Level
                        </div>
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${(0, formatters_1.getRiskLevelBadge)(analysis.riskLevel)}`}>
                          {analysis.riskLevel.toUpperCase()} RISK
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-xl ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                        <lucide_react_1.Activity className="w-6 h-6"/>
                      </div>
                      <div>
                        <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Market Cap
                        </div>
                        <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {token.marketCap}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-xl ${isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
                        <lucide_react_1.Clock className="w-6 h-6"/>
                      </div>
                      <div>
                        <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Last Updated
                        </div>
                        <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {analysis.lastUpdated.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trading View Chart Placeholder */}
                <div className={`mb-8 p-8 rounded-2xl border ${isDark ? 'bg-slate-800/30 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Live Trading View
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Live Data
                      </span>
                    </div>
                  </div>
                  <div className={`h-80 rounded-xl border-2 border-dashed flex items-center justify-center ${isDark ? 'border-slate-600 bg-slate-800/50' : 'border-gray-300 bg-gray-100/50'}`}>
                    <div className="text-center">
                      <lucide_react_1.LineChart className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}/>
                      <div className={`text-lg font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                        TradingView Integration
                      </div>
                      <div className={`text-sm ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
                        Live price chart and technical indicators would display here
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analysis Categories */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {analysis.categories.map((category, categoryIndex) => (<div key={categoryIndex} className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-800/30 border-slate-700' : 'bg-white border-gray-200'}`}>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${categoryIndex === 0 ? 'bg-blue-500/20 text-blue-400' :
                    categoryIndex === 1 ? 'bg-emerald-500/20 text-emerald-400' :
                        categoryIndex === 2 ? 'bg-purple-500/20 text-purple-400' :
                            'bg-orange-500/20 text-orange-400'}`}>
                            {categoryIndex === 0 ? <lucide_react_1.Code className="w-5 h-5"/> :
                    categoryIndex === 1 ? <lucide_react_1.Droplets className="w-5 h-5"/> :
                        categoryIndex === 2 ? <lucide_react_1.Users className="w-5 h-5"/> :
                            <lucide_react_1.Network className="w-5 h-5"/>}
                          </div>
                          <div>
                            <Tooltip_1.Tooltip content={category.description} isDark={isDark}>
                              <h4 className={`text-lg font-bold cursor-help ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {category.abbreviation}
                              </h4>
                            </Tooltip_1.Tooltip>
                            <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              {category.name}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${category.score >= 80 ? 'text-emerald-400' :
                    category.score >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                            {Math.round(category.score)}
                          </div>
                          <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                            Weight: {category.weight}%
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {category.metrics.map((metric, metricIndex) => (<div key={metricIndex} className={`p-4 rounded-xl border ${isDark ? 'bg-slate-700/30 border-slate-600' : 'bg-gray-50 border-gray-200'}`}>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <Tooltip_1.Tooltip content={metric.description} isDark={isDark}>
                                  <span className={`text-sm font-semibold cursor-help ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {metric.abbreviation}
                                  </span>
                                </Tooltip_1.Tooltip>
                                <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                  {metric.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`text-sm font-medium ${(0, formatters_1.getStatusColor)(metric.status)}`}>
                                  {Math.round(metric.value)}
                                </span>
                                <span className={`w-2 h-2 rounded-full ${metric.status === 'safe' ? 'bg-emerald-400' :
                        metric.status === 'warning' ? 'bg-amber-400' : 'bg-red-400'}`}></span>
                              </div>
                            </div>
                            <div className={`w-full h-2 rounded-full ${isDark ? 'bg-slate-600' : 'bg-gray-200'}`}>
                              <div className={`h-2 rounded-full transition-all duration-500 ${metric.status === 'safe' ? 'bg-emerald-400' :
                        metric.status === 'warning' ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${metric.value}%` }}></div>
                            </div>
                          </div>))}
                      </div>
                    </div>))}
                </div>

                {/* Recommendations */}
                <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-800/30 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2 rounded-lg ${isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
                      <lucide_react_1.Brain className="w-5 h-5"/>
                    </div>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      AI Recommendations
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {analysis.recommendations.map((recommendation, index) => (<div key={index} className={`flex items-start gap-3 p-4 rounded-xl ${recommendation.startsWith('Critical')
                    ? isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'
                    : recommendation.startsWith('Caution')
                        ? isDark ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-amber-50 border border-amber-200'
                        : isDark ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-200'}`}>
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${recommendation.startsWith('Critical') ? 'bg-red-400' :
                    recommendation.startsWith('Caution') ? 'bg-amber-400' : 'bg-emerald-400'}`}></div>
                        <span className={`text-sm ${recommendation.startsWith('Critical')
                    ? isDark ? 'text-red-300' : 'text-red-700'
                    : recommendation.startsWith('Caution')
                        ? isDark ? 'text-amber-300' : 'text-amber-700'
                        : isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
                          {recommendation}
                        </span>
                      </div>))}
                  </div>
                </div>
              </div>) : (<div className="p-12 text-center">
                <div className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Analysis Failed
                </div>
                <div className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Unable to perform token analysis at this time
                </div>
              </div>)}
          </div>

          {/* Footer */}
          <div className={`px-8 py-6 border-t ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-gray-100 bg-gray-50/50'}`}>
            <div className="flex items-center justify-between">
              <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <strong>Disclaimer:</strong> This analysis is for informational purposes only and should not be considered financial advice.
              </div>
              <div className="flex gap-3">
                <button onClick={onClose} className={`px-6 py-3 rounded-xl font-medium transition-colors ${isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`}>
                  Close
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-[1.02] transition-all duration-200">
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
exports.AnalysisModal = AnalysisModal;
