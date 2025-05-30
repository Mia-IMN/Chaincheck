import { useState, useEffect } from 'react';
import { SuiSystemState } from '../types';

export const useSuiSystemData = () => {
  const [systemState, setSystemState] = useState<SuiSystemState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSystemState = async () => {
      try {
        const response = await fetch('https://fullnode.mainnet.sui.io:443', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "suix_getLatestSuiSystemState",
            params: [],
            id: 1
          })
        });
        
        const data = await response.json();
        
        if (data.result) {
          setSystemState({
            epoch: data.result.epoch || '0',
            totalStake: data.result.totalStake || '0',
            activeValidators: data.result.activeValidators?.length || 0,
            totalSupply: data.result.totalSupply || '0'
          });
        }
      } catch (error) {
        console.error('Error fetching Sui system state:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSystemState();
  }, []);

  return { systemState, loading };
};