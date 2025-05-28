// Home.jsx
import {  Wallet,XCircle,CheckCircle} from 'lucide-react';


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
       <div className="token-input w-full px-4 py-24 flex justify-center mb-8">
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
      <div className="token-overview bg-[#060418] min-h-screen pt-20 px-6 text-white flex flex-col items-center">
        <div className="title px-4 sm:px-6 md:px-10 py-8 bg-[#060418]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Token Overview
          </h2>
        </div>

        <div className="w-full max-w-5xl flex flex-col gap-6">
          {/* Token Info Section */}
          <div className="grid md:grid-cols-2 gap-4 border border-white p-14">
            <div>
              <h2 className="text-orange-500 font-semibold">Token Name</h2>
              <p>ABC</p>
              <p>Chain</p>
              <p>Contract Verified</p>
            </div>
            <div>
              <h2 className="text-orange-500 font-semibold">Smart Contract Behaviour</h2>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={16} /> <span>Mint function</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="text-red-500" size={16} /> <span>Ownership Enounced</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={16} /> <span>Max Wallet cap</span>
              </div>
            </div>
          </div>

          {/* Liquidity and Community Section */}
          <div className="grid md:grid-cols-2 gap-4 border border-white p-14">
            <div>
              <h2 className="text-orange-500 font-semibold">Liquidity Analysis</h2>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={16} /> <span>Liquidity locked</span>
              </div>
              <p>Liquidity lock duration</p>
              <p>% Liquidity owned by creator</p>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={16} /> <span>LP burnt</span>
              </div>
            </div>
            <div>
              <h2 className="text-orange-500 font-semibold">Community Metrics</h2>
              <p>Twitter followers: ##</p>
              <p>Telegram members: ##</p>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={16} /> <span>Active Dev wallet</span>
              </div>
              <div>
                <span>Social audit</span>
                <div className="w-full h-2 bg-gray-600 rounded-full mt-1">
                  <div className="h-full bg-gradient-to-r from-green-400 to-red-500 rounded-full w-3/4"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Rugpull Risk Section */}
          <div className="grid md:grid-cols-2 gap-4 border border-white p-10 items-center">
            <div>
              <h2 className="text-orange-500 font-semibold">Rugpull Risk Score</h2>
              <ul className="list-disc list-inside">
                <li>Re-check token</li>
                <li>View on Etherscan</li>
                <li>Download PDF report</li>
              </ul>
            </div>
            <div className="flex flex-col items-center justify-center">
              {/* Placeholder for Risk Score Image */}
              <img src="https://otiktpyazqotihijbwhm.supabase.co/storage/v1/object/public/images/7d1b68b8-b503-406f-a7dd-5603784f6874-image.png" alt="" width={'300px'} height={'200px'}/>
            </div>
          </div>
        </div>
      </div>  
      {/* this is the assurance section  */}
      <div className="assurance flex flex-col items-center justify-center bg-[#060418] text-white py-16 px-4 gap-6">
        <h2 className="font-bold text-3xl sm:text-4xl text-center">Safe and Reliable</h2>

        <div className="w-32 sm:w-40 md:w-48">
          <img
            src="https://otiktpyazqotihijbwhm.supabase.co/storage/v1/object/public/images/7d2f7f2d-736d-4244-80d4-2acfcaa87ebf-image.png"
            alt="Assurance Graphic"
            className="w-full h-auto"
          />
        </div>

        <div className="text-center">
          <p className="max-w-[800px] md:max-w-[600px] sm:max-w-[90%] text-center mx-auto text-sm sm:text-base">
            ChainCheck helps crypto users stay safe by instantly evaluating the trust worthiness of any token using smart contract analysis, liquidity data, and community signals on Sui.
          </p>
        </div>
      </div>
      {/* this is the before footer section chaincheck banner  */}
      <div className="before-footer bg-gradient-to-r from-[#A9DADC] to-[#70C494] min-h-[40vh] md:min-h-[50vh] flex items-center py-10 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
          <div className="flex-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900">
              Ready to Secure your Tokens?
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-orange-500 mt-4">
              Join CHAINCHECK today
            </p>
          </div>
          <div>
            <button className="bg-[#4372B8] text-white text-base sm:text-lg px-6 py-4 rounded-full shadow-md transition-all duration-300 flex items-center gap-2 cursor-pointer">
              Connect Wallet
              <Wallet className="inline-block" size={20} />
            </button>
          </div>
        </div>
      </div>    

 
    </>
  );
};

export default Home;
