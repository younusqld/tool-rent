// Products.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <section id="products" className="py-20 bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Available Tools for Rent
        </h2>
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          </div>
        )}
        {error && (
          <div className="text-center text-red-600 text-lg font-medium space-y-4">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        )}
        {!loading && !error && (
          <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Adjusted grid layout */}
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard
                    key={product.tool_id}
                    id={product.tool_id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                  />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-600 text-lg font-medium bg-gray-50 border border-gray-200 rounded-lg py-12 px-6">
                  No tools available for rent.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Products;