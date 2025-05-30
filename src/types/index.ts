import React from 'react';

// Global window interface
declare global {
  interface Window {
    suiWallet?: any;
  }
}

// Core interfaces
export interface Token {
  id: number;
  name: string;
  symbol: string;
  price: string;
  change: string;
  marketCap: string;
  volume: string;
  riskScore: 'low' | 'medium' | 'high';
  trending: 'up' | 'down';
  address?: string;
  liquidity?: string;
  image?: string;
  category?: 'DeFi' | 'Gaming' | 'Infrastructure' | 'NFT' | 'Other';
}

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

export interface Article {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author?: string;
}

// Live data interfaces
export interface SuiTokenData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  market_cap_rank: number;
  circulating_supply: number;
  max_supply: number;
  image: string;
}

export interface SuiSystemState {
  epoch: string;
  totalStake: string;
  activeValidators: number;
  totalSupply: string;
}

export interface MarketStats {
  totalTokens: number;
  scamsDetected: number;
  riskAssessments: number;
  activeUsers: number;
}

// Filtering and pagination interfaces
export interface TokenFilters {
  category: string;
  search: string;
  sortBy: 'market_cap' | 'volume' | 'price_change_percentage_24h' | 'name';
  sortOrder: 'asc' | 'desc';
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// Wallet interfaces
export interface WalletConnection {
  address: string;
  type: 'zk-google' | 'sui-wallet';
  name?: string;
  email?: string;
  avatar?: string;
}

// Analysis interfaces
export interface AnalysisMetric {
  name: string;
  abbreviation: string;
  description: string;
  value: number;
  status: 'safe' | 'warning' | 'risk';
  weight: number;
}

export interface AnalysisCategory {
  name: string;
  abbreviation: string;
  description: string;
  metrics: AnalysisMetric[];
  score: number;
  weight: number;
}

export interface TokenAnalysis {
  token: Token;
  trustScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  categories: AnalysisCategory[];
  lastUpdated: Date;
  recommendations: string[];
}

// App state types
export type PageType = 'home' | 'portfolio' | 'learn';
export type ThemeType = 'light' | 'dark';