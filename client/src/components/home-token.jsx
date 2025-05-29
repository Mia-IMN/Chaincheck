import React from "react";
import { ScanSearch } from "lucide-react"; // import the icon

function TokenInput() {
  return (
    <div className="p-6 bg-[#11011E] animated-gradient-2 text-white" id="token-analysis">
      <div className="w-full px-6 py-28 flex justify-center animated-gradient-2 border border-white/10 rounded-2xl">
        <div className="w-full max-w-xl flex flex-col items-center gap-8">
          {/* Title Inside Glassmorphic Container */}
          <h2 className="text-center text-4xl font-bold">Token Analyzer</h2>
  
          {/* Glassmorphism Input Box */}
          <div className="w-full backdrop-blur-md bg-white/5 border border-white/10 shadow-md rounded-full overflow-hidden flex transition duration-300 hover:border-white">
            <input
              type="text"
              placeholder="Paste Token Address here..."
              className="flex-grow px-5 py-3 text-sm text-white bg-transparent focus:outline-none placeholder-white/70"
            />
            <button className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-[#A9DADC] to-[#70C494] hover:from-[#8CC9C8] hover:to-[#5ABF98] transition-colors duration-200 rounded-r-full">
              <ScanSearch size={16} />
              Analyze
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TokenInput;
