const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const scriptRoutes=require("./routes/scriptRoutes");



// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/text-generate",scriptRoutes);

module.exports = app; // Export app instead of running it here
