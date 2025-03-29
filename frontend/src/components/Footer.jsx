import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      {/* Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Section 1: About Us */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p className="text-gray-400 leading-relaxed">
            ToolRent is your one-stop platform for renting high-quality tools. Whether you need drills, welding machines, or electric cutters, we deliver them to your doorstep.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="text-gray-400 hover:text-blue-500 transition duration-300">
                Home
              </a>
            </li>
            <li>
              <a href="#products" className="text-gray-400 hover:text-blue-500 transition duration-300">
                Products
              </a>
            </li>
            <li>
              <a href="#about" className="text-gray-400 hover:text-blue-500 transition duration-300">
                About Us
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gray-400 hover:text-blue-500 transition duration-300">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Section 3: Contact Us */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="text-gray-400">Email: support@toolrent.com</p>
          <p className="text-gray-400">Phone: +1 (123) 456-7890</p>
          <div className="flex space-x-4 mt-4">
            {/* Social Media Icons */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 2v2m0 16v2m-6-9h12a6 6 0 010 12H6a6 6 0 010-12z"
                />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h8m-4-4v8"
                />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25zm0 5.625a3.375 3.375 0 100 6.75 3.375 3.375 0 000-6.75zM12 15a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="mt-8 border-t border-gray-800 pt-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} ToolRent. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;