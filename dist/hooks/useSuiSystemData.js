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
exports.useSuiSystemData = void 0;
const react_1 = require("react");
const useSuiSystemData = () => {
    const [systemState, setSystemState] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const fetchSystemState = () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield fetch('https://fullnode.mainnet.sui.io:443', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        jsonrpc: "2.0",
                        method: "suix_getLatestSuiSystemState",
                        params: [],
                        id: 1
                    })
                });
                const data = yield response.json();
                if (data.result) {
                    setSystemState({
                        epoch: data.result.epoch || '0',
                        totalStake: data.result.totalStake || '0',
                        activeValidators: ((_a = data.result.activeValidators) === null || _a === void 0 ? void 0 : _a.length) || 0,
                        totalSupply: data.result.totalSupply || '0'
                    });
                }
            }
            catch (error) {
                console.error('Error fetching Sui system state:', error);
            }
            finally {
                setLoading(false);
            }
        });
        fetchSystemState();
    }, []);
    return { systemState, loading };
};
exports.useSuiSystemData = useSuiSystemData;
