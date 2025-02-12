const express = require("express");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const ListSchema = require("../models/List");

const { authenticate } = require("../midddleware/authMiddleware");

const generateCodes = (query) => {
  if (/^\d{3}$/.test(query)) return [query]; 

  if (/^\d{2}x$/.test(query)) {
    const base = query.slice(0, 2); 
    return Array.from({ length: 10 }, (_, i) => `${base}${i}`);
  }

  if (/^\d{x}$/.test(query)) {
    const base = query.charAt(0); 
    return Array.from({ length: 100 }, (_, i) => `${base}${String(i).padStart(2, "0")}`);
  }

  return [];
};

router.get("/:query", async (req, res) => {
  const { query } = req.params;
  const codes = generateCodes(query);

  if (!codes.length) {
    return res.status(400).json({ error: "Invalid query format" });
  }

  try {

    const imageRequests = codes.map((code) =>
      axios.get(`https://http.dog/${code}.json`).then((res) => res.data)
    );

    const imageData = await Promise.allSettled(imageRequests);
    const results = imageData
      .filter((res) => res.status === "fulfilled")
      .map((res) => res.value);

    res.json(results);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



router.post("/save", authenticate, async (req, res) => {
  try {
    const { name, images } = req.body;
    const userId = req.userId; 

    console.log("Name, images, user ID:", name, images, userId);

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const newList = new ListSchema({ name, images, userId });
    await newList.save();

    res.status(201).json({ message: "List saved successfully!" });
  } catch (error) {
    console.error("Error saving list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
