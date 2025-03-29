import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tool, setTool] = useState(null);
  const [rentDays, setRentDays] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => {
        setTool(res.data);
        setTotalCost(rentDays * quantity * res.data.price);
      })
      .catch((err) => console.error("Error fetching tool details:", err));
  }, [id, rentDays, quantity]);

  const handleInputChange = (e, type) => {
    const value = Number(e.target.value);
    if (type === "rentDays") {
      setRentDays(value);
    } else if (type === "quantity") {
      setQuantity(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Prepare order data
      const orderData = {
        name: tool.name,
        price: tool.price,
        quantity: quantity,
        duration: rentDays,
      };

      // Send order data to the backend
      const response = await axios.post("http://localhost:5000/order", orderData);

      // Check response
      if (response.status === 201) {
        alert("Payment successful! Your rental is confirmed.");
        navigate("/home");
      }
    } catch (error) {
      console.error("Order placement error:", error.response?.data || error.message);
      alert("Failed to place the order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!tool) {
    return <div className="text-center text-xl font-semibold mt-10">Loading...</div>;
  }

  return (
    <section className="bg-gray-100 min-h-screen py-8 flex justify-center">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h1>

        <div className="border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <p className="text-gray-600">{tool.name}</p>
          <p className="text-gray-600">Price: ₹{tool.price} / day</p>
          <p className="text-gray-600">Duration: {rentDays} days</p>
          <p className="text-gray-600">Quantity: {quantity}</p>
          <p className="text-lg font-medium text-gray-800 mt-2">Total: ₹{totalCost}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="card">Credit/Debit Card</option>
            <option value="upi">UPI</option>
            <option value="netbanking">Net Banking</option>
          </select>
        </div>

        {paymentMethod === "card" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Card Number</label>
            <input
              type="text"
              placeholder="**** **** **** ****"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        )}

        {paymentMethod === "upi" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">UPI ID</label>
            <input
              type="text"
              placeholder="example@upi"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        )}

        {paymentMethod === "netbanking" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Bank Name</label>
            <input
              type="text"
              placeholder="Enter your bank"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          className={`w-full py-3 rounded-lg text-white font-semibold ${
            isProcessing ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing Payment..." : "Confirm & Pay"}
        </button>
      </div>
    </section>
  );
}

export default Checkout;