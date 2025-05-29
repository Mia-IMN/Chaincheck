import { ScanSearch } from "lucide-react";

const HomeHero = () => {
  const scrollToTokenAnalysis = () => {
    const section = document.getElementById("token-analysis");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero-section text-white flex flex-col justify-center items-center text-center px-4 h-[95vh]">
      <h1 className="text-3xl md:text-5xl font-bold mb-8">
          Your Sui Scam Radar Know what's real, spot what's fake!
      </h1>
      <p className="text-sm md:text-base mb-6 max-w-xl">
          Sui ChainCheck cuts through the noise, making it easy to DYOR and enjoy a scam-free experience on Sui.      </p>
      <button
        onClick={scrollToTokenAnalysis}
        className="bg-[#0FAE96] text-white px-6 py-2 rounded-md flex items-center gap-2"
      >
        <ScanSearch size={18} />
        Analyze Token
      </button>
    </div>
  );
};

export default HomeHero;
