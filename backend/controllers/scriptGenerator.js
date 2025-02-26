



import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Script from "../models/script.js"; 

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateScript = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.user?.userId;

 

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required!" });
    }

    // Use correct model name
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    });

    if (!result || !result.response || !result.response.candidates) {
      throw new Error("Invalid API response from Gemini");
    }

    const generatedText = result.response.candidates[0]?.content?.parts[0]?.text || "No text generated";

    // Save to database
    const script = await Script.create({ userId, prompt, generatedText });

    return res.status(201).json({ message: "Script generated!", script });

  } catch (error) {
    console.error("Error generating script:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const getScripts = async (req, res) => {
    try {
      const userId = req.user.userId;
      const scripts = await Script.findAll({ where: { userId } });
  
      return res.status(200).json({ scripts });
    } catch (error) {
      console.error("Error fetching scripts:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  // Get a single script by ID
  export const getScriptById = async (req, res) => {
    try {
      const userId = req.user.userId;
      const { id } = req.params;
  
      const script = await Script.findOne({ where: { id, userId } });
  
      if (!script) return res.status(404).json({ message: "Script not found!" });
  
      return res.status(200).json({ script });
    } catch (error) {
      console.error("Error fetching script:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  // Update a script
  export const updateScript = async (req, res) => {
    try {
      const userId = req.user.userId;
      const { id } = req.params;
      const { prompt } = req.body;
  
      const script = await Script.findOne({ where: { id, userId } });
  
      if (!script) return res.status(404).json({ message: "Script not found!" });
  
      script.prompt = prompt || script.prompt;
      await script.save();
  
      return res.status(200).json({ message: "Script updated!", script });
    } catch (error) {
      console.error("Error updating script:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  // Delete a script
  export const deleteScript = async (req, res) => {
    try {
      const userId = req.user.userId;
      const { id } = req.params;
  
      const script = await Script.findOne({ where: { id, userId } });
  
      if (!script) return res.status(404).json({ message: "Script not found!" });
  
      await script.destroy();
  
      return res.status(200).json({ message: "Script deleted successfully!" });
    } catch (error) {
      console.error("Error deleting script:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
