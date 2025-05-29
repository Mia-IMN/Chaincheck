import { Wallet, Twitter, Send } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    navigate('/');
    setTimeout(() => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50); // slight delay for route change
  };

  return (
    <footer className="bg-[#11011E] text-white px-8 py-28">
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
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li
              className="hover:underline cursor-pointer"
              onClick={() => scrollToSection('token-analysis')}
            >
              Check a Token
            </li>
            <li
              className="hover:underline cursor-pointer"
              onClick={() => scrollToSection('how-it-works')}
            >
              How it Works
            </li>
            <li><Link to="/learn" className="hover:underline">FAQs</Link></li>
            <li><Link to="/blog" className="hover:underline">Blog</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
          </ul>
        </div>

        {/* Updated Profile Links */}
        <div>
          <h4 className="font-bold mb-3 text-lg">Profile</h4>
          <ul className="space-y-6 text-sm">
            <li><Link to="/profile" className="hover:underline">Profile Manager</Link></li>
            <li><Link to="/market" className="hover:underline">Market</Link></li>
            <li><Link to="/trade" className="hover:underline">Trade</Link></li>
            <li><Link to="/support" className="hover:underline">Support</Link></li>
            <li><Link to="/report-scam" className="hover:underline">Report a Scam</Link></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="font-bold mb-3 text-lg">Legal</h4>
          <ul className="space-y-6 text-sm">
            <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="/cookies" className="hover:underline">Cookie Policy</Link></li>
            <li><Link to="/disclaimer" className="hover:underline">Disclaimer</Link></li>
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
      <div className="mt-10 border-t border-white/20 pt-6 text-sm text-center lg:text-right">
        © 2025 ChainCheck. All rights reserved. <br />
        Built with trust for the Sui Build-a-thon.
      </div>
    </footer>
  );
};

export default Footer;
