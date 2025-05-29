import React from "react";
import { ShieldCheck, Code2, Waves, Radar, Users } from "lucide-react";

const features = [
  {
    icon: <Code2 size={32} className="text-white" />,
    title: "Smart Contract Deep Scan",
    description:
      "Uncover hidden dangers with automated smart contract analysis. ChainCheck flags suspicious code patterns like mint exploits, honeypots, and owner-only controls so you know exactly what you’re dealing with.",
  },
  {
    icon: <Waves size={32} className="text-white" />,
    title: "Real-Time Liquidity Insights",
    description:
      "Check liquidity depth, lock status, and ownership breakdown instantly. We alert you to risky setups like unlocked LPs or whale-controlled pools that could vanish overnight.",
  },
  {
    icon: <Radar size={32} className="text-white" />,
    title: "Holder & Activity Radar",
    description:
      "Track token distribution and wallet behavior. We spot shady patterns like sybil wallets, insider dumps, or sketchy whale movement so you don’t get blindsided.",
  },
  {
    icon: <Users size={32} className="text-white" />,
    title: "Community Pulse Scanner",
    description:
      "Gauge the social side of a project. We surface community signals like follower activity, social engagement, and developer responsiveness, helping you avoid the hype traps.",
  },
];

function Features() {
  return (
    <section className="min-h-screen px-8 py-28 animated-gradient text-white">
      <div className="max-w-6xl mx-auto text-center mb-20">
        <h2 className="text-4xl font-bold mb-4">ChainCheck Amazing Features</h2>
        <p className="text-lg max-w-3xl mx-auto">
          Explore amazing features designed to keep you safe and make your Sui journey scam free.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 border border-white/10 transform transition duration-300 hover:scale-105 hover:border-white"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-3">
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;