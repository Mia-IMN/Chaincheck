import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { WalletKitProvider } from '@mysten/wallet-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

test('renders learn react link', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <WalletKitProvider>
        <App />
      </WalletKitProvider>
    </QueryClientProvider>
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
