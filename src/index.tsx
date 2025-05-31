import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SuiClientProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getFullnodeUrl } from '@mysten/sui/dist/cjs/client';
import { NetworkConfig } from '@mysten/dapp-kit';
import { WalletKitProvider } from '@mysten/wallet-kit';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

type NetworkConfigs = {
  testnet: NetworkConfig;
};

const networkConfig: NetworkConfigs = {
  testnet: {
    url: 'https://fullnode.testnet.sui.io'
  }
};

const queryClient = new QueryClient()


root.render(
  <React.StrictMode>
        <QueryClientProvider client={queryClient}>
    <SuiClientProvider networks={networkConfig} defaultNetwork={'testnet'}>
      <WalletKitProvider>
        <App />

      </WalletKitProvider>
    </SuiClientProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
