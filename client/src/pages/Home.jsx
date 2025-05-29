// src/pages/Home.jsx
import React from 'react';
import HomeHero from "../components/home-hero";  
import Features from "../components/home-features"; 
import TokenInput from "../components/home-token";
import HowItWorks from "../components/hero-how"; // Assuming this is the correct path to your steps data

const Home = () => {
  return (
    <>
      <section>
        <HomeHero />
        <Features />
        <HowItWorks />
        <div id='token-analysis'>
          <TokenInput />
        </div>
      </section>
    </>
  );
};

export default Home;


/* src/index.css (or create separate css file if preferred) */
