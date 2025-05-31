"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navigation = void 0;
const react_1 = __importDefault(require("react"));
const lucide_react_1 = require("lucide-react");
const light_svg_1 = __importDefault(require("./light.svg"));
const dark_svg_1 = __importDefault(require("./dark.svg"));
const Navigation = ({ theme, setTheme, currentPage, setCurrentPage, mobileMenuOpen, setMobileMenuOpen, wallet, setShowWalletModal, marketLoading, marketError, refetch }) => {
    const isDark = theme === 'dark';
    const navigationItems = [
        { name: 'Home', id: 'home' },
        { name: 'Manager', id: 'portfolio' },
        { name: 'Learn', id: 'learn' }
    ];
    return (<nav className={`fixed w-full z-50 backdrop-blur-xl border-b ${isDark
            ? 'bg-slate-900/80 border-white/10'
            : 'bg-white/80 border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo only */}
          <div className="flex items-center">
            <div className=" w-25 h-25">
              <img src={isDark ? dark_svg_1.default : light_svg_1.default} alt="Logo" className="w-full h-full object-contain"/>
              <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse ${marketLoading ? 'bg-yellow-400' : marketError ? 'bg-red-400' : 'bg-green-400'}`}></div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => (<button key={item.id} onClick={() => setCurrentPage(item.id)} className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${currentPage === item.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                : isDark
                    ? 'text-slate-300 hover:text-white hover:bg-white/10'
                    : 'text-slate-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                {item.name}
              </button>))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            <button onClick={refetch} disabled={marketLoading} className={`p-3 rounded-xl backdrop-blur-sm border transition-all duration-200 hover:scale-110 ${isDark
            ? 'bg-white/10 border-white/20 text-blue-400'
            : 'bg-gray-100 border-gray-200 text-blue-600'} ${marketLoading ? 'animate-spin' : ''}`} title="Refresh live data">
              <lucide_react_1.RefreshCw className="w-5 h-5"/>
            </button>

            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={`p-3 rounded-xl backdrop-blur-sm border transition-all duration-200 hover:scale-110 ${isDark
            ? 'bg-white/10 border-white/20 text-yellow-400'
            : 'bg-gray-100 border-gray-200 text-gray-600'}`}>
              {isDark ? <lucide_react_1.Sun className="w-5 h-5"/> : <lucide_react_1.Moon className="w-5 h-5"/>}
            </button>

            {wallet ? (<button onClick={() => setShowWalletModal(true)} className={`flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-sm border transition-all duration-200 hover:scale-105 ${isDark
                ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-white/20 text-white hover:bg-white/10'
                : 'bg-gradient-to-r from-blue-50 to-purple-50 border-gray-200 text-gray-900 hover:bg-gray-100'}`}>
                {wallet.type === 'zk-google' ? (<div className="w-6 h-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <lucide_react_1.User className="w-4 h-4 text-white"/>
                  </div>) : (<div className="w-6 h-6 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                    <lucide_react_1.Wallet className="w-4 h-4 text-white"/>
                  </div>)}
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium">
                    {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                  </div>
                  <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {wallet.type === 'zk-google' ? 'ZK Login' : 'Sui Wallet'}
                  </div>
                </div>
              </button>) : (<button onClick={() => setShowWalletModal(true)} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-200 flex items-center gap-2">
                <lucide_react_1.Wallet className="w-5 h-5"/>
                <span className="hidden sm:inline">Connect Wallet</span>
              </button>)}

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`md:hidden p-3 rounded-xl backdrop-blur-sm border ${isDark
            ? 'bg-white/10 border-white/20 text-white'
            : 'bg-gray-100 border-gray-200 text-gray-600'}`}>
              {mobileMenuOpen ? <lucide_react_1.X className="w-5 h-5"/> : <lucide_react_1.Menu className="w-5 h-5"/>}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (<div className={`md:hidden py-6 border-t backdrop-blur-sm ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
            {navigationItems.map((item) => (<button key={item.id} onClick={() => {
                    setCurrentPage(item.id);
                    setMobileMenuOpen(false);
                }} className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${currentPage === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : isDark
                        ? 'text-slate-300 hover:text-white hover:bg-white/10'
                        : 'text-slate-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                {item.name}
              </button>))}

            <div className="mt-4 pt-4 border-t border-white/10">
              {wallet ? (<button onClick={() => {
                    setShowWalletModal(true);
                    setMobileMenuOpen(false);
                }} className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 ${isDark
                    ? 'text-slate-300 hover:text-white hover:bg-white/10'
                    : 'text-slate-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                  {wallet.type === 'zk-google' ? (<lucide_react_1.User className="w-5 h-5"/>) : (<lucide_react_1.Wallet className="w-5 h-5"/>)}
                  <div>
                    <div className="text-sm font-medium">
                      {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {wallet.type === 'zk-google' ? 'ZK Login' : 'Sui Wallet'}
                    </div>
                  </div>
                </button>) : (<button onClick={() => {
                    setShowWalletModal(true);
                    setMobileMenuOpen(false);
                }} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-full px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                  <lucide_react_1.Wallet className="w-5 h-5"/>
                  Connect Wallet
                </button>)}
            </div>
          </div>)}
      </div>
    </nav>);
};
exports.Navigation = Navigation;
