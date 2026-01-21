import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-50 shadow-md px-4 sm:px-6 lg:px-10 py-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/">
          <div className="flex items-center space-x-2 z-50">
            <img src="/assets/logo.png" alt="Logo" className="h-10 w-10 rounded-4xl" />
            <h1 className="text-xl font-bold text-gray-800">
              Invent<span className="text-blue-500">O<span className="text-blue-500">Predict</span></span>
            </h1>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex flex-1 justify-center gap-8 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/analysis" className="hover:text-blue-500">Analysis</Link>
          <Link to="/about" className="hover:text-blue-500">About</Link>
          <Link to="/contactus" className="hover:text-blue-500">Contact us</Link>
          <Link to="/feedback" className="hover:text-blue-500">Feedback Us</Link>
        </div>

        {/* Right Section */}
        <div className="hidden lg:block relative">
          {!user ? (
            <Link to="/login">
              <button className="bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-lg text-sm font-medium">
                Login / Register
              </button>
            </Link>
          ) : (
            <div className="relative">
              {/* User Button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full shadow hover:shadow-md transition"
              >
                <FaUserCircle size={26} className="text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  {user.company_name}
                </span>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-xl bg-white shadow-xl border overflow-hidden animate-fade-in">
                  <div className="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white">
                    <p className="text-sm font-semibold">{user.company_name}</p>
                    <p className="text-xs opacity-90">{user.company_code}</p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    <FiLogOut />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden z-50">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-full bg-white z-40 transform transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="pt-24 px-8 flex flex-col items-center gap-6 text-lg text-gray-700 font-medium">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/analysis" onClick={() => setMenuOpen(false)}>Analysis</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contactus" onClick={() => setMenuOpen(false)}>Contact us</Link>
          <Link to="/feedback" onClick={() => setMenuOpen(false)}>Feedback Us</Link>

          {!user ? (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <button className="mt-6 bg-blue-100 px-5 py-2 rounded-lg text-sm">
                Login / Register
              </button>
            </Link>
          ) : (
            <>
              <div className="mt-6 text-sm text-gray-600">
                {user.company_name}
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-red-600 text-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
