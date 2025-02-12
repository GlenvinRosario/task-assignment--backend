const express = require("express");
const List = require("../models/List");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const lists = await List.find().sort({ created_at: -1 }); 
    res.json(lists);
  } catch (error) {
    console.error("Error fetching lists:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
