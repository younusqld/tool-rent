import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminPage() {
  const [tools, setTools] = useState([]);
  const [summary, setSummary] = useState([]);
  const [newTool, setNewTool] = useState({
    name: "",
    price: "",
    quantity: "",
    image: "",
    description: "",
  });
  const [error, setError] = useState("");

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

    if (!newTool.name || !newTool.price || !newTool.quantity) {
      setError("Please fill in all required fields (Name, Price, Quantity).");
      return;
    }

    try {
      const numericTool = {
        name: newTool.name,
        price: parseFloat(newTool.price),
        quantity: parseInt(newTool.quantity, 10),
        image: newTool.image || null,
        description: newTool.description || null,
      };
      await axios.post("http://localhost:5000/admin/add-tool", numericTool);
      setNewTool({ name: "", price: "", quantity: "", image: "", description: "" });
      fetchTools();
    } catch (err) {
      setError("Failed to add tool. Please check the input values.");
    }
  };

  const handleRemoveTool = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/remove-tool/${id}`);
      fetchTools();
    } catch (err) {
      setError("Failed to remove tool.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      {/* Header */}
      <h1 className="text-5xl font-bold text-center text-gray-800 mb-12 tracking-wider animate-fade-in">
        Admin Dashboard
      </h1>

      {/* Add Tool Section */}
      <div className="bg-white shadow-lg rounded-3xl p-10 mb-10 transition-shadow hover:shadow-2xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Add New Tool</h2>
        <form onSubmit={handleAddTool} className="space-y-6">
          <input
            type="text"
            placeholder="Tool Name"
            value={newTool.name}
            onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
            className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newTool.price}
            onChange={(e) => setNewTool({ ...newTool, price: e.target.value })}
            className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newTool.quantity}
            onChange={(e) => setNewTool({ ...newTool, quantity: e.target.value })}
            className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            required
          />
          <input
            type="url"
            placeholder="Image URL (Optional)"
            value={newTool.image}
            onChange={(e) => setNewTool({ ...newTool, image: e.target.value })}
            className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
          <textarea
            placeholder="Description (Optional)"
            value={newTool.description}
            onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
            className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          ></textarea>
          <button
            type="submit"
            className="w-48 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold py-5 rounded-2xl hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            Add Tool
          </button>
          
        </form>
      </div>

      {/* Tools List */}
      <div className="bg-white shadow-lg rounded-3xl p-10 mb-10 transition-shadow hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Tools List</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-6 px-8 text-left font-semibold">Tool Name</th>
                <th className="py-6 px-8 text-left font-semibold">Price</th>
                <th className="py-6 px-8 text-left font-semibold">Quantity</th>
                <th className="py-6 px-8 text-left font-semibold">Image</th>
                <th className="py-6 px-8 text-left font-semibold">Description</th>
                <th className="py-6 px-8 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool) => (
                <tr
                  key={tool.tool_id}
                  className="border-b hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-6 px-8 text-sm font-medium text-gray-900">{tool.name}</td>
                  <td className="py-6 px-8 text-sm text-gray-900">${tool.price}</td>
                  <td className="py-6 px-8 text-sm text-gray-900">{tool.quantity}</td>
                  <td className="py-6 px-8">
                    {tool.image && (
                      <img
                        src={tool.image}
                        alt={tool.name}
                        className="w-16 h-16 object-cover rounded-md shadow-md"
                      />
                    )}
                  </td>
                  <td className="py-6 px-8 text-sm text-gray-700">
                    {tool.description || "No description available"}
                  </td>
                  <td className="py-6 px-8">
                    <button
                      onClick={() => handleRemoveTool(tool.tool_id)}
                      className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2h3l1 2H4a1 1 0 000 2h3l1 2H4a1 1 0 000 2h3l2.553 1.447A1 1 0 0011 18h5a1 1 0 000-2h-2.447l-1-2H16a1 1 0 000-2h-2.447l-1-2H16a1 1 0 000-2h-2.447l-1-2H16a1 1 0 000-2h-5a1 1 0 00-.894.553L9 2zm0 2a1 1 0 000 2h2a1 1 0 000-2H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rental Summary */}
      <div className="bg-white shadow-lg rounded-3xl p-10 transition-shadow hover:shadow-2xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Rental Summary</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-6 px-8 text-left font-semibold">Tool Name</th>
              <th className="py-6 px-8 text-left font-semibold">Total Quantity</th>
              <th className="py-6 px-8 text-left font-semibold">Rented Quantity</th>
              <th className="py-6 px-8 text-left font-semibold">Available Quantity</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition-colors duration-200">
                <td className="py-6 px-8">{item.name}</td>
                <td className="py-6 px-8">{item.totalQuantity}</td>
                <td className="py-6 px-8">{item.rentedQuantity}</td>
                <td className="py-6 px-8">{item.availableQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-center mt-6 font-medium animate-shake">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline-block mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export default AdminPage;