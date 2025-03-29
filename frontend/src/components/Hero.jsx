import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHammer, FaWrench, FaTools, FaBolt, FaTruck } from "react-icons/fa";
import Products from "../components/Products.jsx"; // Import Products Component

function Hero() {
  const [showProducts, setShowProducts] = useState(false); // Manage visibility

  // If "Explore Tools" is clicked, hide Hero and show Products
  if (showProducts) {
    return <Products />;
  }

  return (
    <section className="relative h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Left Side - Text Content */}
      <motion.div
        className="md:w-1/2 space-y-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-100 drop-shadow-md">
          Rent the Right Tools for the Job
        </h1>
        <p className="text-lg text-gray-300">
          From power drills to welding machines—find everything you need, when you need it.
        </p>
        <button
          onClick={() => setShowProducts(true)} // Hide Hero and show Products
          className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition duration-300"
        >
          Explore Tools
        </button>
      </motion.div>

      {/* Right Side - Tool Categories Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-6 md:w-1/2 mt-10 md:mt-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <ToolCategory icon={<FaHammer />} title="Hand Tools" />
        <ToolCategory icon={<FaWrench />} title="Wrenches" />
        <ToolCategory icon={<FaTools />} title="Power Tools" />
        <ToolCategory icon={<FaBolt />} title="Electrical Tools" />
        <ToolCategory icon={<FaTruck />} title="Heavy Equipment" />
      </motion.div>
    </section>
  );
}

// Tool Category Card
function ToolCategory({ icon, title }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center bg-white/10 border border-white/20 text-white py-4 px-6 rounded-lg shadow-md hover:bg-white/20 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-3xl">{icon}</div>
      <p className="mt-2 text-lg font-semibold">{title}</p>
    </motion.div>
  );
}

export default Hero;
