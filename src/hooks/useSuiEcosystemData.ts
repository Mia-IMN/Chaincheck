import { useState, useEffect, useCallback } from 'react';
import { SuiTokenData, TokenFilters, PaginationInfo } from '../types';

export const useSuiEcosystemData = (page: number = 1, perPage: number = 50, filters: TokenFilters) => {
  const [tokens, setTokens] = useState<SuiTokenData[]>([]);
  const [allTokens, setAllTokens] = useState<SuiTokenData[]>([]);
  const [suiMainToken, setSuiMainToken] = useState<SuiTokenData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: perPage
  });

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      
      // Fetch SUI main token data
      const suiResponse = await fetch(
        'https://api.coingecko.com/api/v3/coins/sui?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false'
      );
      
      // Fetch Sui ecosystem tokens with pagination
      const ecosystemResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=sui-ecosystem&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
      );
      
      if (!suiResponse.ok || !ecosystemResponse.ok) {
        throw new Error('Failed to fetch market data');
      }
      
      const [suiData, ecosystemData] = await Promise.all([
        suiResponse.json(),
        ecosystemResponse.json()
      ]);
      
      // Process SUI main token
      const processedSuiToken: SuiTokenData = {
        id: suiData.id,
        symbol: suiData.symbol?.toUpperCase() || 'SUI',
        name: suiData.name || 'Sui',
        current_price: suiData.market_data?.current_price?.usd || 0,
        price_change_percentage_24h: suiData.market_data?.price_change_percentage_24h || 0,
        market_cap: suiData.market_data?.market_cap?.usd || 0,
        total_volume: suiData.market_data?.total_volume?.usd || 0,
        market_cap_rank: suiData.market_cap_rank || 0,
        circulating_supply: suiData.market_data?.circulating_supply || 0,
        max_supply: suiData.market_data?.max_supply || 0,
        image: suiData.image?.small || ''
      };
      
      setSuiMainToken(processedSuiToken);
      
      // Store all tokens for filtering
      const allTokensData = [processedSuiToken, ...(ecosystemData || [])];
      setAllTokens(allTokensData);
      
      // Apply filters and pagination
      const filteredTokens = applyFilters(allTokensData, filters);
      const paginatedTokens = paginate(filteredTokens, page, perPage);
      
      setTokens(paginatedTokens.data);
      setPagination(paginatedTokens.pagination);
      setLastUpdated(new Date());
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error('Error fetching Sui ecosystem data:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, page, perPage]);

  const applyFilters = (tokensData: SuiTokenData[], filters: TokenFilters): SuiTokenData[] => {
    let filtered = [...tokensData];
    
    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(token => 
        token.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        token.symbol.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    // Apply category filter (simplified categorization based on token names)
    if (filters.category !== 'All') {
      filtered = filtered.filter(token => {
        const name = token.name.toLowerCase();
        const symbol = token.symbol.toLowerCase();
        
        switch (filters.category) {
          case 'DeFi':
            return name.includes('dex') || name.includes('swap') || name.includes('cetus') || 
                   name.includes('turbos') || name.includes('finance') || symbol.includes('cetus');
          case 'Gaming':
            return name.includes('game') || name.includes('nft') || name.includes('metaverse') ||
                   name.includes('play');
          case 'Infrastructure':
            return name.includes('sui') || name.includes('node') || name.includes('validator') ||
                   name.includes('bridge') || name.includes('oracle');
          default:
            return true;
        }
      });
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (filters.sortBy) {
        case 'market_cap':
          aValue = a.market_cap;
          bValue = b.market_cap;
          break;
        case 'volume':
          aValue = a.total_volume;
          bValue = b.total_volume;
          break;
        case 'price_change_percentage_24h':
          aValue = a.price_change_percentage_24h || 0;
          bValue = b.price_change_percentage_24h || 0;
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        default:
          aValue = a.market_cap;
          bValue = b.market_cap;
      }
      
      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    return filtered;
  };
  
  const paginate = (data: SuiTokenData[], page: number, perPage: number) => {
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / perPage);
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    
    return {
      data: data.slice(startIndex, endIndex),
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: perPage
      }
    };
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    // Update every 30 seconds only for price data
    const interval = setInterval(() => {
      if (!filters.search && filters.category === 'All') {
        fetchData();
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, [filters.search, filters.category, fetchData]);

  return { tokens, allTokens, suiMainToken, loading, error, lastUpdated, pagination, refetch: fetchData };
};