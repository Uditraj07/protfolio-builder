// src/components/Header.jsx
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-white">Logo</Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Signup</Link>
              <Link to="/portfolio" className="hover:underline">Your Portfolio</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              <Link to="/portfolio" className="hover:underline">Your Portfolio</Link>
              <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded">
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? '×' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-700 p-4 space-y-4 mt-2.5">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="block hover:underline">Login</Link>
              <Link to="/register" className="block hover:underline">Signup</Link>
              <Link to="/portfolio" className="block hover:underline">Your Portfolio</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="block hover:underline">Dashboard</Link>
              <Link to="/portfolio" className="block hover:underline">Your Portfolio</Link>
              <button onClick={logout} className="block bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
