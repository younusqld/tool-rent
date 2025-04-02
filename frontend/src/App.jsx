import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Checkout from "./components/Checkout";
import Admin from "./pages/AdminPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false); // New state for admin auth
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to check authentication status
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const isExpired = Date.now() >= decodedToken.exp * 1000;
        setIsAuthenticated(!isExpired);
        if (isExpired) {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    navigate("/home");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsAdminAuthenticated(false); // Reset admin auth on logout
    location.reload();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <>
      {isAuthenticated && <Header onLogout={handleLogout} />}

      <main className="min-h-screen">
        <Routes>
          {/* Redirect root to /home or /login based on authentication */}
          <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />

          {/* Login Route */}
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login onLoginSuccess={handleLoginSuccess} />
              ) : (
                <Navigate to="/home" />
              )
            }
          />

          {/* Signup Route */}
          <Route
            path="/signup"
            element={!isAuthenticated ? <Signup /> : <Navigate to="/home" />}
          />

          {/* Home Route */}
          <Route
            path="/home"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />

          {/* Product Details Route */}
          <Route
            path="/product/:id"
            element={isAuthenticated ? <ProductDetails /> : <Navigate to="/login" />}
          />

          {/* Checkout Route */}
          <Route
            path="/checkout/:id"
            element={isAuthenticated ? <Checkout /> : <Navigate to="/login" />}
          />

          {/* Admin Route with Password Prompt */}
          <Route
            path="/admin"
            element={
              isAuthenticated ? (
                isAdminAuthenticated ? (
                  <Admin />
                ) : (
                  <AdminPasswordPrompt
                    onAdminLogin={() => setIsAdminAuthenticated(true)}
                  />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </main>

      {isAuthenticated && <Footer />}
    </>
  );
}

// Component to handle Admin Password Prompt
function AdminPasswordPrompt({ onAdminLogin }) {
  useEffect(() => {
    const password = window.prompt("Enter Admin Password:");
    if (password === "admin") {
      onAdminLogin(); // Set admin authenticated state
    } else {
      alert("Incorrect password. Access denied.");
      window.location.href = "/home"; // Redirect to home if password is wrong
    }
  }, [onAdminLogin]);

  return null; // Render nothing while prompting
}

export default App;