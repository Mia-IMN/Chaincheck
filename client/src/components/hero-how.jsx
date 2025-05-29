import React from "react";
import {
  SearchCheck,
  MousePointerClick,
  ScanSearch,
  Search,
} from "lucide-react";

const steps = [
  {
    title: "Input Token",
    description: "Paste the token address to begin your security scan.",
    icon: <SearchCheck size={28} className="text-white" />,
  },
  {
    title: "Click Analyze",
    description: "Run a deep scan across smart contracts and token data.",
    icon: <MousePointerClick size={28} className="text-white" />,
  },
  {
    title: "Get Results",
    description:
      "Review potential risks like honeypots, mint access, or LP issues.",
    icon: <ScanSearch size={28} className="text-white" />,
  },
];

export default function HowItWorks() {
  const scrollToTokenSection = () => {
    const target = document.getElementById("token-analysis");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full animated-gradient text-white py-24 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4">How To Use ChainCheck</h2>
          <p className="text-white/70 mb-6">
            Simple steps to uncover risks before you invest in any token.
          </p>
          <button
            onClick={scrollToTokenSection}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0FAE96] text-white font-medium rounded-md hover:bg-[#0d9d85] transition"
          >
            <Search size={18} />
            Get Started
          </button>
        </div>

        {/* Right Section - Steps */}
        <div className="flex flex-col gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:border-white/30 transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-[#1D1A27] rounded-full">
                {step.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-sm text-white/70">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
