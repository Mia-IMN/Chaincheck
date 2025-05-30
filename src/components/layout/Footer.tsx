import React from 'react';

interface FooterProps {
  isDark: boolean;
  lastUpdated: Date | null;
}

export const Footer: React.FC<FooterProps> = ({ isDark, lastUpdated }) => {
  const platformLinks = ['Token Analysis', 'Risk Assessment', 'Portfolio Management', 'Market Intelligence', 'API Access'];
  const resourceLinks = ['Documentation', 'Research Papers', 'Case Studies', 'Security Audits', 'Contact Sales'];
  const legalLinks = ['Terms', 'Privacy', 'Security', 'Status'];

  return (
    <footer className={`py-20 px-6 border-t ${
      isDark 
        ? 'bg-slate-800/50 border-white/10' 
        : 'bg-slate-50 border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <div className={`w-6 h-6 rounded-lg ${
                  isDark ? 'bg-white' : 'bg-white'
                }`}></div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  ChainCheck
                </div>
                <div className={`text-sm ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Professional Grade Intelligence
                </div>
              </div>
            </div>
            <p className={`mb-8 max-w-md leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Enterprise-grade token analysis and risk assessment platform for institutional investors and professional traders on the Sui blockchain.
            </p>
            <div className={`text-sm ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              © 2025 ChainCheck Intelligence. All rights reserved.
            </div>
            {lastUpdated && (
              <div className={`text-xs mt-2 ${
                isDark ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Last market update: {lastUpdated.toLocaleString()}
              </div>
            )}
          </div>
          
          <div>
            <h4 className={`font-semibold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Platform
            </h4>
            <ul className="space-y-3">
              {platformLinks.map((item) => (
                <li key={item}>
                  <a href="#" className={`${
                    isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-gray-900'
                  } transition-colors duration-200 text-sm`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className={`font-semibold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Resources
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map((item) => (
                <li key={item}>
                  <a href="#" className={`${
                    isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-gray-900'
                  } transition-colors duration-200 text-sm`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className={`mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${
          isDark ? 'border-white/10' : 'border-gray-200'
        }`}>
          <div className={`text-sm ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Built for the future of institutional DeFi • Powered by live Sui blockchain data
          </div>
          <div className="flex items-center gap-6">
            {legalLinks.map((item) => (
              <a
                key={item}
                href="#"
                className={`text-sm ${
                  isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-gray-900'
                } transition-colors duration-200`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};