// Home.jsx
import {  Wallet} from 'lucide-react';


const Home = () => {
  return (
    <>
      {/* this is the hero section  */}
      <div className="herosection bg-gradient-to-r from-[#A9DADC] to-[#70C494] h-[80vh] w-full p-8 grid grid-cols-2 ">
        <div className="text p-6 flex flex-col justify-center items-start gap-8">
       <div className="title pr-9 flex justify-center lg:justify-start">
        <h1 className="max-w-none lg:max-w-[450px] text-center lg:text-left text-4xl sm:text-5xl font-bold">
          Token Trust Checker <span className="text-[#F7941D]">onSui</span>
        </h1>
      </div>

        <p>ChainCheck allows users to paste any token address and instantly receive a comprehensive trust evaluation. This evaluation includes Smart contract risk analysis, liquidity checks, Community health metrics, and Scam likelihood scores.</p>
        <button className='flex text-white back bg-[#4372B8] py-4 px-8 rounded-3xl center-auto'>Connect wallet<Wallet /></button>
        </div>
        <div className="image place-self-center">
          <img src="https://otiktpyazqotihijbwhm.supabase.co/storage/v1/object/public/images/de07b5b0-e23d-44df-afad-b1d4823b98c9-image.png" alt="" width={'450px'} height={'500px'}/>
        </div>
      </div>
      {/* this is the after hero section  */}
      <div className="after-hero bg-[#060418] px-4 sm:px-8 md:px-14 py-20 text-white h-[60vh] sm:h-[50vh] flex flex-col justify-center items-center gap-6 sm:gap-8 text-center">
        <p className="text-2xl sm:text-4xl md:text-5xl font-bold leading-snug sm:leading-tight">
          Scan any token, Know the risk
          <br />
          before you buy
        </p>
      </div>
      {/* this is the token input section  */}
      <div className="token-input w-full px-4 py-24 flex justify-center">
        <div className="flex w-full max-w-xl shadow-md rounded-full overflow-hidden border border-blue-200">
          <input
            type="text"
            placeholder="Paste Token Address here..."
            className="flex-grow px-4 py-3 text-sm text-gray-700 focus:outline-none"
          />
          <button className="px-6 py-3 text-sm font-medium text-white bg-[#B1D8D7] hover:bg-[#94c4c2] transition-colors duration-200 rounded-r-full">
            Analyze
          </button>
        </div>
      </div>
      {/* this is the token overview section */}
      
    </>

  );
};

export default Home;
