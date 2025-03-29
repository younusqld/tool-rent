import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Header({ role = "guest", username = "Guest" }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <header className="bg-gray-950 shadow-md sticky top-0 z-50">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white hover:text-blue-700 transition duration-300">
          Rent a Tool
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {role !== "guest" && (
            <span className="text-white font-medium">Hi, {username}</span>
          )}
          
          {/* Show "Welcome Admin" if on the admin page */}
          {location.pathname === "/admin" && (
            <span className="text-green-400 font-semibold">Welcome Admin</span>
          )}

          {role !== "guest" && (
            <button
              onClick={handleLogout}
              className="text-white hover:text-red-500 font-medium transition duration-300"
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="text-gray-300 hover:text-blue-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Conditional Rendering) */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-gray-900 py-6 border-t border-gray-700">
          <nav className="flex flex-col space-y-4 px-4">
            {role !== "guest" && (
              <>
                <span className="text-white font-medium">Hi, {username}</span>
                {location.pathname === "/admin" && (
                  <span className="text-gray-400 font-semibold">Welcome Admin</span>
                )}
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-red-500 font-medium transition duration-300 w-full text-left"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
