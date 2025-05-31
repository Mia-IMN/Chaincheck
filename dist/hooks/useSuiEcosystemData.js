"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSuiEcosystemData = void 0;
const react_1 = require("react");
const useSuiEcosystemData = (page = 1, perPage = 50, filters) => {
    const [tokens, setTokens] = (0, react_1.useState)([]);
    const [allTokens, setAllTokens] = (0, react_1.useState)([]);
    const [suiMainToken, setSuiMainToken] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const [lastUpdated, setLastUpdated] = (0, react_1.useState)(null);
    const [pagination, setPagination] = (0, react_1.useState)({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: perPage
    });
    const fetchData = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        try {
            setError(null);
            // Fetch SUI main token data
            const suiResponse = yield fetch('https://api.coingecko.com/api/v3/coins/sui?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false');
            // Fetch Sui ecosystem tokens with pagination
            const ecosystemResponse = yield fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=sui-ecosystem&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`);
            if (!suiResponse.ok || !ecosystemResponse.ok) {
                throw new Error('Failed to fetch market data');
            }
            const [suiData, ecosystemData] = yield Promise.all([
                suiResponse.json(),
                ecosystemResponse.json()
            ]);
            // Process SUI main token
            const processedSuiToken = {
                id: suiData.id,
                symbol: ((_a = suiData.symbol) === null || _a === void 0 ? void 0 : _a.toUpperCase()) || 'SUI',
                name: suiData.name || 'Sui',
                current_price: ((_c = (_b = suiData.market_data) === null || _b === void 0 ? void 0 : _b.current_price) === null || _c === void 0 ? void 0 : _c.usd) || 0,
                price_change_percentage_24h: ((_d = suiData.market_data) === null || _d === void 0 ? void 0 : _d.price_change_percentage_24h) || 0,
                market_cap: ((_f = (_e = suiData.market_data) === null || _e === void 0 ? void 0 : _e.market_cap) === null || _f === void 0 ? void 0 : _f.usd) || 0,
                total_volume: ((_h = (_g = suiData.market_data) === null || _g === void 0 ? void 0 : _g.total_volume) === null || _h === void 0 ? void 0 : _h.usd) || 0,
                market_cap_rank: suiData.market_cap_rank || 0,
                circulating_supply: ((_j = suiData.market_data) === null || _j === void 0 ? void 0 : _j.circulating_supply) || 0,
                max_supply: ((_k = suiData.market_data) === null || _k === void 0 ? void 0 : _k.max_supply) || 0,
                image: ((_l = suiData.image) === null || _l === void 0 ? void 0 : _l.small) || ''
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
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch data');
            console.error('Error fetching Sui ecosystem data:', err);
        }
        finally {
            setLoading(false);
        }
    }), [filters, page, perPage]);
    const applyFilters = (tokensData, filters) => {
        let filtered = [...tokensData];
        // Apply search filter
        if (filters.search) {
            filtered = filtered.filter(token => token.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                token.symbol.toLowerCase().includes(filters.search.toLowerCase()));
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
            }
            else {
                return aValue < bValue ? 1 : -1;
            }
        });
        return filtered;
    };
    const paginate = (data, page, perPage) => {
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
    (0, react_1.useEffect)(() => {
        fetchData();
    }, [fetchData]);
    (0, react_1.useEffect)(() => {
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
exports.useSuiEcosystemData = useSuiEcosystemData;
