import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav  className="bg-black bg-opacity-75 backdrop-blur-md p-4 px-16 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
       
        <div className="text-white text-xl font-bold"><Link to="/">Beyond Limits</Link></div>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/" className="text-white hover:text-gray-300">About Us</Link>
          <Link to="/" className="text-white hover:text-gray-300">Contact</Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            {isSearchOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full p-2 rounded-lg focus:outline-none"
                />
              </div>
            )}
          </div>

        
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Login</Link>
                <Link to="/register" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;