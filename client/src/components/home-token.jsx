import React, { useState, useEffect } from "react";
import axios from "axios";
import { ScanSearch } from "lucide-react";

function TokenInput() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Validate Sui token address format (object ID style)
  const validateTokenAddress = (value) => {
    return /^0x[a-fA-F0-9]{64}$/.test(value);
  };

  useEffect(() => {
    if (!tokenAddress) {
      setIsValid(null);
      setError("");
      return;
    }

    if (validateTokenAddress(tokenAddress)) {
      setIsValid(true);
      setError("");
    } else {
      setIsValid(false);
      setError("This is not a valid Sui token address.");
    }
  }, [tokenAddress]);

  const handleAnalyze = async () => {
    if (!isValid) return;

    try {
      setLoading(true);
      await axios.post("/api/analyze-token", { tokenAddress });
      // Optional: trigger success message or backend response
    } catch (err) {
      setError("An error occurred while analyzing the token.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#11011E] animated-gradient-2 text-white" id="token-analysis">
      <div className="w-full px-6 py-28 flex justify-center border border-white/10 rounded-2xl">
        <div className="w-full max-w-xl flex flex-col items-center gap-8">
          <h2 className="text-center text-4xl font-bold">Token Analyzer</h2>

          <div className={`w-full backdrop-blur-md bg-white/5 border ${isValid === false ? 'border-red-500' : 'border-white/10'} shadow-md rounded-full overflow-hidden flex transition duration-300`}>
            <input
              type="text"
              placeholder="Paste Sui Token Address here..."
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value.trim())}
              className="flex-grow px-5 py-3 text-sm text-white bg-transparent focus:outline-none placeholder-white/70"
            />
            <button
              onClick={handleAnalyze}
              disabled={!isValid || loading}
              className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-[#A9DADC] to-[#70C494] hover:from-[#8CC9C8] hover:to-[#5ABF98] transition-colors duration-200 rounded-r-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Analyzing..." : <><ScanSearch size={16} /> Analyze</>}
            </button>
          </div>

          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          {isValid && !error && tokenAddress && (
            <p className="text-sm text-green-400 mt-2">This is a valid Sui token address.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TokenInput;
