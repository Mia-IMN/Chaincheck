import React from 'react';
import { Article } from '../types';
import { getCategoryStyle } from '../utils/formatters';

interface LearnPageProps {
  isDark: boolean;
}

export const LearnPage: React.FC<LearnPageProps> = ({ isDark }) => {
  const articles: Article[] = [
    {
      title: "Sui Blockchain Architecture Deep Dive",
      excerpt: "Understanding Sui's parallel execution model, object-centric design, and Move programming language for institutional applications.",
      category: "Infrastructure",
      readTime: "12 min read",
      date: "May 28, 2025",
      author: "Dr. Sarah Chen"
    },
    {
      title: "Institutional DeFi Risk Management",
      excerpt: "Advanced frameworks for assessing smart contract risks, liquidity risks, and regulatory considerations in DeFi protocols.",
      category: "Risk Management",
      readTime: "18 min read",
      date: "May 27, 2025",
      author: "Michael Rodriguez"
    },
    {
      title: "On-Chain Analytics for Professional Traders",
      excerpt: "Leveraging blockchain data science for alpha generation, market microstructure analysis, and systematic trading strategies.",
      category: "Analytics",
      readTime: "15 min read",
      date: "May 26, 2025",
      author: "Prof. James Liu"
    },
    {
      title: "Move Smart Contract Security Audit Guide",
      excerpt: "Comprehensive methodologies for auditing Move smart contracts, common vulnerabilities, and best security practices.",
      category: "Security",
      readTime: "22 min read",
      date: "May 25, 2025",
      author: "Alex Thompson"
    },
    {
      title: "Tokenomics Analysis for Institutional Investors",
      excerpt: "Advanced frameworks for evaluating token economics, governance mechanisms, and long-term value accrual models.",
      category: "Research",
      readTime: "16 min read",
      date: "May 24, 2025",
      author: "Dr. Maria Santos"
    },
    {
      title: "Cross-Chain Bridge Security Assessment",
      excerpt: "Professional methodologies for evaluating bridge security, monitoring tools, and risk mitigation strategies.",
      category: "Security",
      readTime: "14 min read",
      date: "May 23, 2025",
      author: "David Kim"
    }
  ];

  const categories = ['All', 'Security', 'Infrastructure', 'Analytics', 'Risk Management', 'Research'];

  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className={`text-4xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Research & Intelligence Hub
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Professional insights, research papers, and analysis from leading blockchain experts and institutional researchers
          </p>
        </div>

        {/* Categories filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                category === 'All' 
                  ? 'bg-gradient-to-r from-[#2F5A8A] to-[#437AF3] text-white border-transparent'
                  : isDark 
                    ? 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10' 
                    : 'bg-white text-slate-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article
              key={index}
              className={`group p-8 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 cursor-pointer ${
                isDark 
                  ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                  : 'bg-white border-gray-200 hover:bg-gray-50 hover:shadow-xl'
              }`}
            >
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border mb-6 ${getCategoryStyle(article.category, isDark)}`}>
                {article.category}
              </div>
              
              <h3 className={`text-xl font-bold mb-4 leading-tight group-hover:text-blue-500 transition-colors duration-200 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {article.title}
              </h3>
              
              <p className={`leading-relaxed mb-6 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {article.excerpt}
              </p>
              
              <div className={`flex items-center justify-between text-sm border-t pt-4 ${
                isDark ? 'border-white/10 text-slate-400' : 'border-gray-200 text-slate-500'
              }`}>
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${
                    index % 4 === 0 ? 'from-blue-500 to-purple-600' :
                    index % 4 === 1 ? 'from-emerald-500 to-teal-600' :
                    index % 4 === 2 ? 'from-orange-500 to-red-600' :
                    'from-purple-500 to-pink-600'
                  }`}></div>
                  <span className="font-medium">{article.author}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>{article.readTime}</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter signup */}
        <div className={`mt-20 p-12 rounded-3xl backdrop-blur-sm border text-center ${
          isDark 
            ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-white/20' 
            : 'bg-gradient-to-r from-blue-50 to-purple-50 border-gray-200'
        }`}>
          <h3 className={`text-2xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Professional Research Updates
          </h3>
          <p className={`mb-8 max-w-2xl mx-auto ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Get exclusive access to institutional-grade research, market intelligence, and technical analysis from our team of experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your professional email"
              className={`flex-1 px-4 py-3 rounded-xl border backdrop-blur-sm ${
                isDark 
                  ? 'bg-white/10 border-white/20 text-white placeholder-slate-400' 
                  : 'bg-white border-gray-200 text-gray-900 placeholder-slate-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button className="bg-gradient-to-r from-[#2F5A8A] to-[#437AF3] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};