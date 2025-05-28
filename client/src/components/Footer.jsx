import { Wallet, Twitter, Send } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#060418] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {/* Logo & Wallet */}
        <div className="flex flex-col items-start gap-24">
          <img
            src="https://otiktpyazqotihijbwhm.supabase.co/storage/v1/object/public/images/eef2a7c5-a7c3-4d2e-ad01-efb4af29abe9-image.png"
            alt="Logo"
            className="w-50 h-auto"
          />
          <button className="flex items-center gap-2 text-black font-semibold bg-gradient-to-r from-[#A9DADC] to-[#70C494] py-2 px-4 rounded-3xl">
            Connect Wallet <Wallet size={18} />
          </button>
        </div>

        {/* Platform Links */}
        <div>
          <h4 className="font-bold mb-3 text-lg">Platform</h4>
          <ul className="space-y-6 text-sm">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">Check a Token</li>
            <li className="hover:underline cursor-pointer">How it Works</li>
            <li className="hover:underline cursor-pointer">FAQs</li>
            <li className="hover:underline cursor-pointer">Blog</li>
            <li className="hover:underline cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* Profile Links */}
        <div>
          <h4 className="font-bold mb-3 text-lg">Profile</h4>
          <ul className="space-y-6 text-sm">
            <li className="hover:underline cursor-pointer">Sign up</li>
            <li className="hover:underline cursor-pointer">Log in</li>
            <li className="hover:underline cursor-pointer">Dashboard</li>
            <li className="hover:underline cursor-pointer">Report a Scam</li>
            <li className="hover:underline cursor-pointer">Support</li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="font-bold mb-3 text-lg">Legal</h4>
          <ul className="space-y-6 text-sm">
            <li className="hover:underline cursor-pointer">Terms of Service</li>
            <li className="hover:underline cursor-pointer">Privacy Policy</li>
            <li className="hover:underline cursor-pointer">Cookie Policy</li>
            <li className="hover:underline cursor-pointer">Disclaimer</li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col justify-end">
          <div className="icons flex justify-center sm:justify-between gap-6 sm:gap-3 md:gap-4">         
            <Send size={20} className="mb-2 cursor-pointer hover:scale-110 transition-transform" />
            <Twitter size={20} className="mb-2 cursor-pointer hover:scale-110 transition-transform" />
            <FaDiscord size={20} className="cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </div>
    </div>


      {/* Divider and Bottom Text */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-sm text-center lg:text-right">
        © 2025 ChainCheck. All rights reserved. <br />
        Built with trust for the Sui Build-a-thon.
      </div>
    </footer>
  );
};

export default Footer;
