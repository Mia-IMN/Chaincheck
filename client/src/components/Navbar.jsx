import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Globe,
  Menu,
  X,
  Home,
  User,
  BarChart2,
  BookOpen,
  Wallet,
} from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Scroll handler to toggle navbar glass effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`w-full px-6 py-4 flex items-center justify-between text-white fixed top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "bg-white/10 backdrop-blur-md border-white/20 shadow-md"
            : "bg-transparent border-transparent shadow-none"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://otiktpyazqotihijbwhm.supabase.co/storage/v1/object/public/images/eef2a7c5-a7c3-4d2e-ad01-efb4af29abe9-image.png"
            alt="CryptoCap Logo"
            className="h-8"
          />
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 text-sm items-center">
          <li className="text-[#0FAE96] font-semibold cursor-pointer flex items-center gap-1">
            <Home size={16} />
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer flex items-center gap-1">
            <User size={16} />
            <Link to="/profile">Profile</Link>
          </li>
          <li className="cursor-pointer flex items-center gap-1">
            <BarChart2 size={16} />
            <Link to="/market">Market</Link>
          </li>
          <li className="cursor-pointer flex items-center gap-1">
            <BookOpen size={16} />
            <Link to="/learn">Learn</Link>
          </li>
        </ul>

        {/* Right side items */}
        <div className="hidden md:flex items-center gap-4">
          <Globe size={18} />
          <span>EN</span>
          <button className="bg-[#0FAE96] text-white px-5 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-[#0da286] transition">
            <Wallet size={16} />
            Connect Wallet
          </button>
        </div>

        {/* Hamburger button - show on md and below */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex items-center text-white focus:outline-none z-60"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white/10 backdrop-blur-md border-l border-white/20 shadow-lg transform transition-transform duration-300 ease-in-out z-40
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        ref={menuRef}
      >
        <nav className="flex flex-col mt-20 px-6 text-white gap-6 font-semibold text-lg">
          <Link
            to="/"
            className="hover:text-[#0FAE96] flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <Home size={20} />
            Home
          </Link>
          <Link
            to="/profile"
            className="hover:text-[#0FAE96] flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <User size={20} />
            Profile
          </Link>
          <Link
            to="/market"
            className="hover:text-[#0FAE96] flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <BarChart2 size={20} />
            Market
          </Link>
          <Link
            to="/learn"
            className="hover:text-[#0FAE96] flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <BookOpen size={20} />
            Learn
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="mt-6 bg-[#0FAE96] text-white px-5 py-2 rounded-full text-base flex items-center gap-2 hover:bg-[#0da286] transition"
          >
            <Wallet size={18} />
            Connect Wallet
          </button>
        </nav>
      </div>

      {/* Glassmorphic blur overlay instead of black */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-white/10 backdrop-blur-md z-30"
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default Navbar;
