require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Database connection test
async function testDatabaseConnection() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    console.log("Database connected successfully");
    connection.release();
  } catch (error) {
    console.log("Connection failed", error.message);
  }
}
testDatabaseConnection();

// Signup API
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const [userExists] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (userExists.length > 0) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (user.length === 0) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user[0].user_id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      token,
      user: {
        user_id: user[0].user_id,
        name: user[0].name,
        email: user[0].email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
app.post("/order", async (req, res) => {
  try {
    // Destructure the request body
    const { name, price, quantity, duration } = req.body;

    // Validate input
    if (!name || !price || !quantity || !duration) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Insert the order into the database
    const [booking] = await pool.query(
      "INSERT INTO rental (name, price, quantity, duration) VALUES (?, ?, ?, ?)",
      [name, price, quantity, duration]
    );

    // Respond with success message and booking ID
    res.status(201).json({
      message: "Order placed successfully.",
      bookingId: booking.insertId,
    });
  } catch (error) {
    console.error("Order placement error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Profile API (Protected Route)
app.get("/profile", async (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No Token Provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const [user] = await pool.query("SELECT * FROM users WHERE user_id = ?", [verified.userId]);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      user: {
        user_id: user[0].user_id,
        name: user[0].name,
        email: user[0].email,
      },
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
});

// Get all tools
app.get("/products", async (req, res) => {
  try {
    const [tools] = await pool.query("SELECT * FROM tools");
    res.status(200).json(tools);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get a single tool by ID
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [product] = await pool.query("SELECT * FROM tools WHERE tool_id = ?", [id]);
    if (product.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product[0]);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Add a new tool
app.post("/admin/add-tool", async (req, res) => {
  const { name, price, quantity, image, description } = req.body;

  try {
    // Validate input
    if (!name || !price || !quantity) {
      return res.status(400).json({ message: "All required fields are missing.", fields: ["name", "price", "quantity"] });
    }

    // Insert tool into the database
    await pool.query(
      "INSERT INTO tools (name, price, quantity, image, description) VALUES (?, ?, ?, ?, ?)",
      [name, price, quantity, image || null, description || null]
    );

    res.status(201).json({ message: "Tool added successfully." });
  } catch (error) {
    console.error("Error adding tool:", error.message);
    res.status(500).json({ message: "Server Error", details: error.message });
  }
});

// Remove a tool
app.delete("/admin/remove-tool/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Delete tool from the database
    await pool.query("DELETE FROM tools WHERE tool_id = ?", [id]);

    res.status(200).json({ message: "Tool removed successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get rental summary
app.get("/admin/rental-summary", async (req, res) => {
  try {
    // Fetch all tools and their quantities
    const [tools] = await pool.query("SELECT * FROM tools");

    // Fetch all rentals
    const [rentals] = await pool.query("SELECT name, SUM(quantity) AS rentedQuantity FROM rental GROUP BY name");

    // Combine data to calculate available quantities
    const summary = tools.map((tool) => {
      const rented = rentals.find((r) => r.name === tool.name);
      return {
        name: tool.name,
        totalQuantity: tool.quantity,
        rentedQuantity: rented ? rented.rentedQuantity : 0,
        availableQuantity: tool.quantity - (rented ? rented.rentedQuantity : 0),
      };
    });

    res.status(200).json(summary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
app.get("/profile", async (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No Token Provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const [user] = await pool.query("SELECT * FROM users WHERE user_id = ?", [verified.userId]);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      user: {
        user_id: user[0].user_id,
        name: user[0].name,
        email: user[0].email,
      },
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
});

