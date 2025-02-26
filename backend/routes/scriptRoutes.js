const express = require("express");
const { generateScript, getScripts,
    getScriptById,
    updateScript,
    deleteScript, } = require("../controllers/scriptGenerator");
const authMiddleware = require("../middleware/authMiddleware"); // Ensure the user is authenticated

const router = express.Router();

// Generate script
router.post("/generate", authMiddleware, generateScript);

router.get("/getscripts", authMiddleware, getScripts);

// Get a single script by ID
router.get("/getscript/:id", authMiddleware, getScriptById);

// Update a script
router.put("/updatescript/:id", authMiddleware, updateScript);

// Delete a script
router.delete("/deletescript/:id", authMiddleware, deleteScript);

module.exports = router;
