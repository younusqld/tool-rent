import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import axios from "axios";

function Header() {
  const [username, setUsername] = useState(""); // State to store the username (name from API)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch user profile from the /profile API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get("/profile", {
          headers: {
            Authorization: token, // Include token in the Authorization header
          },
        });

        console.log("API Response:", response); // Log the full response

        // Check if response.data.user exists
        if (response.data && response.data.user) {
          const name = response.data.user.name;
          setUsername(name);
        } else {
          console.error("Unexpected API response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        if (error.response && error.response.status === 401) {
          // Unauthorized, redirect to login
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchProfile(); // Call the function to fetch the profile
  }, [navigate]);

  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
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
        <span className="text-white font-medium">
  {location.pathname !== "/admin" && `Hi, ${username || "test"}`}
</span>
{location.pathname === "/admin" && (
  <span className="text-green-400 font-semibold">Welcome Admin</span>
)}
          <button
            onClick={handleLogout}
            className="text-white hover:text-red-500 font-medium transition duration-300"
          >
            Logout
          </button>
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
            <span className="text-white font-medium">Hi, {username || "Guest"}</span>
            {location.pathname === "/admin" && (
              <span className="text-gray-400 font-semibold">Welcome Admin</span>
            )}
            <button
              onClick={handleLogout}
              className="text-white hover:text-red-500 font-medium transition duration-300 w-full text-left"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;