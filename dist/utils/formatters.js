"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryStyle = exports.getStatusBadge = exports.getStatusColor = exports.getRiskLevelBadge = exports.getRiskBadge = exports.getRiskColor = exports.getTokenCategory = exports.getRiskScore = exports.formatSupply = exports.formatVolume = exports.formatMarketCap = exports.formatPrice = void 0;
// Utility functions for formatting
const formatPrice = (price) => {
    if (price < 0.01)
        return `$${price.toFixed(6)}`;
    if (price < 1)
        return `$${price.toFixed(4)}`;
    return `$${price.toFixed(2)}`;
};
exports.formatPrice = formatPrice;
const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e9)
        return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6)
        return `$${(marketCap / 1e6).toFixed(2)}M`;
    if (marketCap >= 1e3)
        return `$${(marketCap / 1e3).toFixed(2)}K`;
    return `$${marketCap.toFixed(2)}`;
};
exports.formatMarketCap = formatMarketCap;
const formatVolume = (volume) => {
    if (volume >= 1e9)
        return `$${(volume / 1e9).toFixed(2)}B`;
    if (volume >= 1e6)
        return `$${(volume / 1e6).toFixed(2)}M`;
    if (volume >= 1e3)
        return `$${(volume / 1e3).toFixed(2)}K`;
    return `$${volume.toFixed(2)}`;
};
exports.formatVolume = formatVolume;
const formatSupply = (supply) => {
    if (supply >= 1e9)
        return `${(supply / 1e9).toFixed(2)}B`;
    if (supply >= 1e6)
        return `${(supply / 1e6).toFixed(2)}M`;
    if (supply >= 1e3)
        return `${(supply / 1e3).toFixed(2)}K`;
    return supply.toString();
};
exports.formatSupply = formatSupply;
// Risk assessment utilities
const getRiskScore = (priceChange, marketCap) => {
    if (marketCap > 1e9 && Math.abs(priceChange) < 10)
        return 'low';
    if (marketCap > 1e8 && Math.abs(priceChange) < 20)
        return 'medium';
    return 'high';
};
exports.getRiskScore = getRiskScore;
const getTokenCategory = (name, symbol) => {
    const nameLower = name.toLowerCase();
    const symbolLower = symbol.toLowerCase();
    if (nameLower.includes('dex') || nameLower.includes('swap') || nameLower.includes('cetus') ||
        nameLower.includes('turbos') || nameLower.includes('finance') || symbolLower.includes('cetus')) {
        return 'DeFi';
    }
    if (nameLower.includes('game') || nameLower.includes('nft') || nameLower.includes('metaverse') ||
        nameLower.includes('play')) {
        return 'Gaming';
    }
    if (nameLower.includes('sui') || nameLower.includes('node') || nameLower.includes('validator') ||
        nameLower.includes('bridge') || nameLower.includes('oracle')) {
        return 'Infrastructure';
    }
    if (nameLower.includes('nft') || nameLower.includes('collectible')) {
        return 'NFT';
    }
    return 'Other';
};
exports.getTokenCategory = getTokenCategory;
// Style utilities
const getRiskColor = (risk) => {
    switch (risk) {
        case 'low': return 'text-emerald-400';
        case 'medium': return 'text-amber-400';
        case 'high': return 'text-red-400';
        default: return 'text-gray-400';
    }
};
exports.getRiskColor = getRiskColor;
const getRiskBadge = (risk) => {
    switch (risk) {
        case 'low': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
        case 'medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
        case 'high': return 'bg-red-500/10 text-red-400 border-red-500/20';
        default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
};
exports.getRiskBadge = getRiskBadge;
const getRiskLevelBadge = (riskLevel) => {
    switch (riskLevel) {
        case 'low': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
        case 'medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
        case 'high': return 'bg-red-500/10 text-red-400 border-red-500/20';
        default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
};
exports.getRiskLevelBadge = getRiskLevelBadge;
const getStatusColor = (status) => {
    switch (status) {
        case 'safe': return 'text-emerald-400';
        case 'warning': return 'text-amber-400';
        case 'risk': return 'text-red-400';
        default: return 'text-gray-400';
    }
};
exports.getStatusColor = getStatusColor;
const getStatusBadge = (status) => {
    switch (status) {
        case 'safe': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
        case 'warning': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
        case 'risk': return 'bg-red-500/10 text-red-400 border-red-500/20';
        default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
};
exports.getStatusBadge = getStatusBadge;
const getCategoryStyle = (category, isDark) => {
    switch (category) {
        case 'Security': return isDark ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-red-50 text-red-600 border-red-200';
        case 'Infrastructure': return isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-600 border-blue-200';
        case 'Analytics': return isDark ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-purple-50 text-purple-600 border-purple-200';
        case 'Risk Management': return isDark ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-orange-50 text-orange-600 border-orange-200';
        case 'Research': return isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-200';
        default: return isDark ? 'bg-gray-500/10 text-gray-400 border-gray-500/20' : 'bg-gray-50 text-gray-600 border-gray-200';
    }
};
exports.getCategoryStyle = getCategoryStyle;
