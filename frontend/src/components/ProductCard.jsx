import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ id, name, price, image }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      className="bg-white p-6 shadow-lg rounded-2xl transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={handleClick}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Product Details */}
      <div className="mt-4 space-y-2">
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <p className="text-green-600 text-lg font-semibold">₹{price} / Day</p>
      </div>

      {/* Rent Now Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click when button is clicked
          handleClick();
        }}
        className="mt-4 w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
      >
        Rent Now
      </button>
    </div>
  );
}

export default ProductCard;