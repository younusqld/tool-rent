import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        fetchRelatedProducts(res.data.category);
      })
      .catch((err) => console.log("Error Fetching Product", err));
  }, [id]);

  const fetchRelatedProducts = (category) => {
    axios.get(`http://localhost:5000/products?category=${category}`)
      .then((res) => setRelatedProducts(res.data.filter(item => item._id !== id)))
      .catch((err) => console.log("Error Fetching Related Products", err));
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  const totalCost = startDate && endDate
    ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) * quantity * (product?.price || 0)
    : 0;

  const handleRentNow = () => {
    if (!startDate || !endDate) {
      alert("Please select rental dates.");
      return;
    }
    navigate(`/checkout/${id}`, { state: { startDate, endDate, quantity, totalCost } });
  };

  return (
    <section className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-lg shadow-lg" />
          </div>

          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-3xl font-bold text-gray-300">{product.name}</h1>
            <p className="text-xl text-green-600 font-semibold">₹{product.price} / Day</p>
            <p className="text-gray-300">{product.description}</p>

            {/* Rental Dates */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Rental Dates</label>
              <div className="flex items-center space-x-4">
                <DatePicker
                  selected={startDate}
                  onChange={setStartDate}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Start Date"
                  minDate={new Date()}
                  className="border p-2 rounded w-full text-gray-300"
                />
                <DatePicker
                  selected={endDate}
                  onChange={setEndDate}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="End Date"
                  className="border p-2 rounded w-full text-white"
                />
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">Quantity</label>
              <div className="flex items-center space-x-2">
                <button onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600 hover:bg-gray-300 transition-all duration-300">
                  -
                </button>
                <span className="text-lg font-medium text-white">{quantity}</span>
                <button onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600 hover:bg-gray-300 transition-all duration-300">
                  +
                </button>
              </div>
            </div>

            {/* Total Cost */}
            <p className="text-lg font-medium text-white">Total Cost: ₹{totalCost}</p>

            {/* Rent Now Button */}
            <button onClick={handleRentNow}
              className="w-3xs bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300">
              Rent Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((related) => (
              <Link to={`/product/${related._id}`} key={related._id}>
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  <img src={related.image} alt={related.name} className="w-full h-40 object-cover rounded-lg" />
                  <p className="text-gray-800 font-medium mt-2">{related.name}</p>
                  <p className="text-green-600 font-semibold">₹{related.price}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">No related products found.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
