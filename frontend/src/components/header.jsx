

import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Adjust the import path based on your project






const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate=useNavigate();

  function handelLogout(){
    logout();
    navigate('/login');
  }

  return (
    <header className="bg-black bg-opacity-90 backdrop-blur-lg text-white fixed top-0 w-full shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between py-5 px-2.5 md:px-5">
        {/* Logo */}
        <div className="text-3xl font-extrabold tracking-wide">
          <Link to="/" className="text-white hover:text-gray-300 transition">
            NolanAI
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-lg">
          {!isLoggedIn ? (
            <>
              <Link to="/features" className="hover:text-gray-300 transition">Features</Link>
              <Link to="/pricing" className="hover:text-gray-300 transition">Pricing</Link>
              <Link to="/about" className="hover:text-gray-300 transition">About Us</Link>
              <Link to="/login" className="hover:text-gray-300 transition">Login</Link>
              <Link to="/register" className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition">
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="hover:text-gray-300 transition">Dashboard</Link>
              <Link to="/profile" className="hover:text-gray-300 transition">Profile</Link>
              <button 
                onClick={handelLogout} 
                className="px-5 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? '×' : '☰'}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden absolute w-full bg-black bg-opacity-95 transition-all duration-300 ${
          isMobileMenuOpen ? "top-16 opacity-100" : "top-[-250px] opacity-0"
        }`}
      >
        <nav className="flex flex-col text-center py-6 space-y-4">
          {!isLoggedIn ? (
            <>
              <Link to="/features" className="text-lg hover:text-gray-300 transition">Features</Link>
              <Link to="/pricing" className="text-lg hover:text-gray-300 transition">Pricing</Link>
              <Link to="/about" className="text-lg hover:text-gray-300 transition">About Us</Link>
              <Link to="/login" className="text-lg hover:text-gray-300 transition">Login</Link>
              <Link to="/register" className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition">
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-lg hover:text-gray-300 transition">Dashboard</Link>
              <Link to="/profile" className="text-lg hover:text-gray-300 transition">Profile</Link>
              <button 
                onClick={handelLogout} 
                className="px-5 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};




export default Header;





