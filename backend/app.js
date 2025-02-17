const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

module.exports = app; // Export app instead of running it here
