export interface WalletConnection {
  address: string;
  type: 'sui-wallet' | 'zk-google';
  name: string;
  label?: string;
  email?: string; // Optional for zk-google
  avatar: string;
}

export type PageType = 'home' | 'portfolio' | 'learn';
export type ThemeType = 'light' | 'dark';

export interface Token {
  symbol: string;
  name: string;
  price: string;
  change: string;
  trending: 'up' | 'down';
  marketCap: string;
  volume: string;
  riskScore: 'low' | 'medium' | 'high';
  image?: string;
  category?: 'DeFi' | 'Gaming' | 'Infrastructure' | 'NFT' | 'Other';
  liquidity?: string;
  address?: string;
}

// Additional types for better type safety
export interface WalletKitConnection {
  address: string;
  label?: string;
  chains?: string[];
}

export interface ZkLoginWalletData extends WalletConnection {
  zkProof: any;
  ephemeralPrivateKey: string;
  maxEpoch: number;
  userSalt: string;
  jwt: string;
}

