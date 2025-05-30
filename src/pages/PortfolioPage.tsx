import React from 'react';
import { BarChart3, Lock } from 'lucide-react';

interface PortfolioPageProps {
  isDark: boolean;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ isDark }) => {
  const features = [
    {
      title: "Real-time Portfolio Tracking",
      description: "Monitor your Sui assets with institutional-grade precision"
    },
    {
      title: "Risk Management Tools",
      description: "Advanced algorithms for portfolio risk assessment and optimization"
    },
    {
      title: "Performance Analytics",
      description: "Comprehensive reporting and performance attribution analysis"
    }
  ];

  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className={`p-16 rounded-3xl backdrop-blur-sm border ${
          isDark 
            ? 'bg-white/5 border-white/10' 
            : 'bg-white border-gray-200 shadow-xl'
        }`}>
          <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <BarChart3 className="w-12 h-12 text-white" />
          </div>
          <h1 className={`text-4xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Portfolio Intelligence
          </h1>
          <p className={`text-xl mb-8 ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Advanced portfolio management and risk assessment tools are in development
          </p>
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border ${
            isDark 
              ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' 
              : 'bg-blue-50 border-blue-200 text-blue-600'
          }`}>
            <Lock className="w-5 h-5" />
            <span className="font-medium">Expected Launch: Q2 2025</span>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {features.map((feature, index) => (
              <div key={index} className={`p-6 rounded-xl border ${
                isDark 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <h3 className={`font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-sm ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};