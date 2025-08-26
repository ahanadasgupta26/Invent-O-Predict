import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-50 shadow-md px-4 sm:px-6 lg:px-10 py-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/">
        <div className="flex items-center space-x-2 z-50"> 
          <img src="/assets/logo.png" alt="Logo" className="h-10 w-10 rounded-4xl" />
          <h1 className="text-xl font-bold text-gray-800">
            Predicto<span className="text-blue-500">Stock</span>
          </h1>
        </div>
        </Link>

        {/* Center: Desktop Links */}
        <div className="hidden lg:flex flex-1 justify-center gap-8 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-500 transition">Home</Link>
          <Link to="/analysis" className="hover:text-blue-500 transition">Analysis</Link>
          <Link to="/about" className="hover:text-blue-500 transition">About</Link>
          <Link to="/contactus" className="hover:text-blue-500 transition">Contact us</Link>
          <Link to="/feedback" className="hover:text-blue-500 transition">Feedback Us</Link>
        </div>

        {/* Right: Login Button */}
        <div className="hidden lg:block">
          <Link to="/login">
            <button className="bg-blue-100 hover:bg-blue-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition">
              Login / Register
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden z-50">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-800 hover:text-blue-500 focus:outline-none"
          >
            {menuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-full bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="pt-24 px-8 flex flex-col items-center gap-6 text-lg text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-500" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/analysis" className="hover:text-blue-500" onClick={() => setMenuOpen(false)}>Analysis</Link>
          <Link to="/about" className="hover:text-blue-500" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contactus" className="hover:text-blue-500" onClick={() => setMenuOpen(false)}>Contact us</Link>
          <Link to="/feedback" className="hover:text-blue-500" onClick={() => setMenuOpen(false)}>Feedback Us</Link>
          <Link to="/login">
          <button
              onClick={() => setMenuOpen(false)}
              className="mt-6 bg-blue-100 hover:bg-blue-200 text-gray-800 px-5 py-2 rounded-lg text-sm font-medium transition"
            >
              Login / Register
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
