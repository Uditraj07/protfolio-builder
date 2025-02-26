const jwt = require("jsonwebtoken");
const userModel=require('../models/user');
require("dotenv").config();

module.exports = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await userModel.findOne({ where: { id: verified.userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found. The account may be deleted." });
    }
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
