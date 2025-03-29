import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminPage() {
  const [tools, setTools] = useState([]);
  const [summary, setSummary] = useState([]);
  const [newTool, setNewTool] = useState({ name: "", price: "", quantity: "" });
  const [error, setError] = useState("");

  // Fetch tools and rental summary on component mount
  useEffect(() => {
    fetchTools();
    fetchRentalSummary();
  }, []);

  const fetchTools = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setTools(response.data);
    } catch (err) {
      setError("Failed to fetch tools.");
    }
  };

  const fetchRentalSummary = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/rental-summary");
      setSummary(response.data);
    } catch (err) {
      setError("Failed to fetch rental summary.");
    }
  };

  const handleAddTool = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/admin/add-tool", newTool);
      setNewTool({ name: "", price: "", quantity: "" });
      fetchTools(); // Refresh the tools list
    } catch (err) {
      setError("Failed to add tool.");
    }
  };

  const handleRemoveTool = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/remove-tool/${id}`);
      fetchTools(); // Refresh the tools list
    } catch (err) {
      setError("Failed to remove tool.");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Add Tool Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Tool</h2>
        <form onSubmit={handleAddTool} className="space-y-4">
          <input
            type="text"
            placeholder="Tool Name"
            value={newTool.name}
            onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            placeholder="Price"
            value={newTool.price}
            onChange={(e) => setNewTool({ ...newTool, price: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="url"
            placeholder="Image url"
            value={newTool.image}
            onChange={(e) => setNewTool({ ...newTool, image: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Tool Name"
            value={newTool.name}
            onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newTool.quantity}
            onChange={(e) => setNewTool({ ...newTool, quantity: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Add Tool
          </button>
        </form>
      </div>

      {/* Tools List */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Tools List</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Tool Name</th>
              <th className="py-2 text-left">Price</th>
              <th className="py-2 text-left">Quantity</th>
              <th className="py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((tool) => (
              <tr key={tool.tool_id} className="border-b">
                <td className="py-2">{tool.name}</td>
                <td className="py-2">${tool.price}</td>
                <td className="py-2">{tool.quantity}</td>
                <td className="py-2">
                  <button
                    onClick={() => handleRemoveTool(tool.tool_id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rental Summary */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Rental Summary</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Tool Name</th>
              <th className="py-2 text-left">Total Quantity</th>
              <th className="py-2 text-left">Rented Quantity</th>
              <th className="py-2 text-left">Available Quantity</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{item.name}</td>
                <td className="py-2">{item.totalQuantity}</td>
                <td className="py-2">{item.rentedQuantity}</td>
                <td className="py-2">{item.availableQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
}

export default AdminPage;