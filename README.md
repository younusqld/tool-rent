# Tool Rent - Tool Rental Management System

## Overview

Tool Rent is a full-stack web application for renting tools online. The platform allows users to browse available tools, view details, place rental orders, and manage authentication. It also includes an admin dashboard for managing tools and viewing rental summaries.

This project is built using:

* **Frontend:** React + Vite + Tailwind CSS
* **Backend:** Node.js + Express.js
* **Database:** MySQL
* **Authentication:** JWT + bcrypt

---

# Features

## User Features

* User Signup and Login
* JWT-based Authentication
* Browse available tools
* View detailed product information
* Place rental orders
* Responsive modern UI

## Admin Features

* Add new tools
* Remove tools
* View rental summary
* Manage inventory quantity

---

# Tech Stack

## Frontend

* React 19
* Vite
* Tailwind CSS
* Axios
* Framer Motion
* React Router DOM
* React Icons

## Backend

* Node.js
* Express.js
* MySQL2
* bcryptjs
* JSON Web Token (JWT)
* dotenv
* cors

---

# Project Structure

```bash
tool-rent-main/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Installation and Setup

## 1. Clone the Repository

```bash
git clone <repository-url>
cd tool-rent-main
```

---

## 2. Setup Backend

### Navigate to Backend Folder

```bash
cd backend
```

### Install Dependencies

```bash
npm install
```

### Create `.env` File

Create a `.env` file inside the backend folder.

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=tool_rental
JWT_SECRET=your_secret_key
PORT=5000
```

### Run Backend Server

```bash
node server.js
```

Or using nodemon:

```bash
npx nodemon server.js
```

---

## 3. Setup Frontend

### Navigate to Frontend Folder

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

# Database Setup

## Create Database

```sql
CREATE DATABASE tool_rental;
```

---

## Users Table

```sql
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);
```

---

## Tools Table

```sql
CREATE TABLE tools (
    tool_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10,2),
    quantity INT,
    image TEXT,
    description TEXT
);
```

---

## Rental Table

```sql
CREATE TABLE rental (
    rental_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10,2),
    quantity INT,
    duration VARCHAR(50)
);
```

---

# API Endpoints

## Authentication

### Signup

```http
POST /signup
```

### Login

```http
POST /login
```

### Profile

```http
GET /profile
```

---

## Products

### Get All Tools

```http
GET /products
```

### Get Tool by ID

```http
GET /products/:id
```

---

## Orders

### Place Rental Order

```http
POST /order
```

---

## Admin

### Add Tool

```http
POST /admin/add-tool
```

### Remove Tool

```http
DELETE /admin/remove-tool/:id
```

### Rental Summary

```http
GET /admin/rental-summary
```

---

# Authentication Flow

1. User signs up or logs in.
2. Server validates credentials.
3. JWT token is generated.
4. Token is used to access protected routes.
5. Passwords are securely hashed using bcrypt.

---

# Future Improvements

* Payment Gateway Integration
* Tool Availability Calendar
* Email Notifications
* User Order History
* Admin Authentication Roles
* Image Upload Support
* Search and Filter Features
* Deployment using Docker

---

# Screens Included

* Home Page
* Product Listing
* Product Details
* Checkout Page
* Login Page
* Signup Page
* Admin Dashboard

---

# Learning Outcomes

This project demonstrates:

* Full-stack web development
* REST API creation
* MySQL database integration
* Authentication using JWT
* React component architecture
* CRUD operations
* State management and API handling

---

# Author

Developed by group of students

---

# License

This project is for educational and learning purposes.
