"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletModal = void 0;
const react_1 = __importDefault(require("react"));
const lucide_react_1 = require("lucide-react");
const WalletModal = ({ isOpen, onClose, isDark, wallet, isConnecting, error, connectWithGoogle, connectWithSuiWallet, disconnect, copyAddress }) => {
    if (!isOpen)
        return null;
    const formatAddress = (address) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };
    return (<div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>

        <div className={`inline-block align-bottom rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white'}`}>
          <div className={`px-6 py-4 border-b ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {wallet ? 'Wallet Connected' : 'Connect Wallet'}
              </h3>
              <button onClick={onClose} className={`p-2 rounded-lg transition-colors ${isDark ? 'text-gray-400 hover:text-white hover:bg-slate-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>
                <lucide_react_1.X className="h-5 w-5"/>
              </button>
            </div>
          </div>

          <div className="px-6 py-6">
            {error && (<div className={`mb-4 p-4 rounded-lg border ${isDark ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-red-50 border-red-200 text-red-600'}`}>
                <div className="flex items-center gap-2">
                  <lucide_react_1.AlertTriangle className="w-4 h-4"/>
                  <span className="text-sm">{error}</span>
                </div>
              </div>)}

            {wallet ? (
        // Connected State
        <div className="space-y-6">
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-700/50 border-slate-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    {wallet.type === 'zk-google' ? (<div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <lucide_react_1.User className="w-6 h-6 text-white"/>
                      </div>) : (<div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                        <lucide_react_1.Wallet className="w-6 h-6 text-white"/>
                      </div>)}
                    <div>
                      <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {wallet.type === 'zk-google' ? 'Google (ZK Login)' : 'Sui Wallet'}
                      </div>
                      {wallet.name && (<div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {wallet.name}
                        </div>)}
                      {wallet.email && (<div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {wallet.email}
                        </div>)}
                    </div>
                  </div>
                  
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                    Wallet Address
                  </div>
                  <div className="flex items-center gap-2">
                    <code className={`flex-1 p-2 rounded-lg text-sm font-mono ${isDark ? 'bg-slate-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                      {formatAddress(wallet.address)}
                    </code>
                    <button onClick={copyAddress} className={`p-2 rounded-lg transition-colors ${isDark ? 'text-gray-400 hover:text-white hover:bg-slate-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'}`} title="Copy address">
                      <lucide_react_1.Copy className="w-4 h-4"/>
                    </button>
                    <button className={`p-2 rounded-lg transition-colors ${isDark ? 'text-gray-400 hover:text-white hover:bg-slate-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'}`} title="View on explorer">
                      <lucide_react_1.ExternalLink className="w-4 h-4"/>
                    </button>
                  </div>
                </div>

                <button onClick={disconnect} className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${isDark ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20' : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'}`}>
                  <lucide_react_1.LogOut className="w-4 h-4"/>
                  Disconnect Wallet
                </button>
              </div>) : (
        // Connection Options
        <div className="space-y-4">
                <p className={`text-center mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Choose your preferred connection method
                </p>

                <button onClick={connectWithGoogle} disabled={isConnecting} className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${isDark
                ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900 hover:shadow-md'} ${isConnecting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <lucide_react_1.User className="w-6 h-6 text-white"/>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">Continue with Google</div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Zero-knowledge login with Google account
                    </div>
                  </div>
                  {isConnecting && (<div className="animate-spin">
                      <lucide_react_1.RefreshCw className="w-5 h-5"/>
                    </div>)}
                </button>

                <button onClick={connectWithSuiWallet} disabled={isConnecting} className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${isDark
                ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900 hover:shadow-md'} ${isConnecting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                    <lucide_react_1.Wallet className="w-6 h-6 text-white"/>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">Sui Wallet</div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Connect with browser extension wallet
                    </div>
                  </div>
                  {isConnecting && (<div className="animate-spin">
                      <lucide_react_1.RefreshCw className="w-5 h-5"/>
                    </div>)}
                </button>

                <div className={`text-xs text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  By connecting a wallet, you agree to ChainCheck's Terms of Service and Privacy Policy
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>);
};
exports.WalletModal = WalletModal;
