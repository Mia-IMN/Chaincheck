import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Wallet, CircleDollarSign, User } from 'lucide-react';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setShowDropdown(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown when a link is clicked
  const handleLinkClick = () => setShowDropdown(false);

  return (
    <>
      {/* Top Navbar */}
      <nav className="main-clr-bg text-white p-4 flex justify-between items-center">
        {/* Logo */}
        <div className="logo w-[160px] sm:w-[220px] md:w-[309px]">
          <img
            src="https://otiktpyazqotihijbwhm.supabase.co/storage/v1/object/public/images/eef2a7c5-a7c3-4d2e-ad01-efb4af29abe9-image.png"
            alt="Logo"
            className="w-full h-auto"
          />
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex list-none gap-6 items-center">
          <li>
            <Link to="/dashboard" className="inline-flex items-center gap-1">
              Dashboard <LayoutDashboard size={18} />
            </Link>
          </li>
          <li>
            <Link to="/trade" className="inline-flex items-center gap-1">
              Trade <Wallet size={18} />
            </Link>
          </li>
          <li>
            <Link to="/market" className="inline-flex items-center gap-1">
              Market <CircleDollarSign size={18} />
            </Link>
          </li>
          <li>
            <Link to="/profile" className="inline-flex items-center gap-1">
              Profile <User size={18} />
            </Link>
          </li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex gap-3">
          <Link to="/login" className="btn-alt text-sm px-4 py-1">Login</Link>
          <Link to="/signup" className="btn text-sm px-4 py-1">Sign Up</Link>
        </div>

        {/* Mobile/Tablet User Icon + Dropdown */}
        <div className="lg:hidden relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            aria-label="Account Menu"
            aria-expanded={showDropdown}
          >
            <User size={24} />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-[#060418] text-white shadow-md rounded-2xl w-32 z-50 text-sm p-2 border-2 border-white">
              <Link
                to="/login"
                onClick={handleLinkClick}
                className="block px-4 py-2 bg-[#060418] text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={handleLinkClick}
                className="block px-4 py-2 bg-[#060418] text-white"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Bottom Navbar for Mobile & Tablet */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#1F2937] text-white flex justify-around items-center py-3 px-6 w-11/12 sm:w-2/3 md:w-1/2 rounded-full shadow-lg lg:hidden z-50 border-white border-2">
        <Link to="/dashboard"><LayoutDashboard size={22} /></Link>
        <Link to="/trade"><Wallet size={22} /></Link>
        <Link to="/market"><CircleDollarSign size={22} /></Link>
        {/* Removed Profile icon from here */}
      </div>
    </>
  );
};

export default Navbar;
