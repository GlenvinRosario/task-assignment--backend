const express = require("express");
const List = require("../models/List");
const jwt = require("jsonwebtoken");
const { authenticate } = require("../midddleware/authMiddleware");
const router = express.Router();

router.use(authenticate);

router.get("/", async (req, res) => {
  try {

    const lists = await List.find({ userId:req.userId }).sort({ created_at: -1 });

    if (!lists.length) {
      return res.status(404).json({ message: "No lists found for this user" });
    }

    res.json(lists);
  } catch (error) {
    console.error("Error fetching lists:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.delete("/:id", async (req, res) => {
  
  const { id } = req.params; 

  try {

    const list = await List.findById(id);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    await List.findByIdAndDelete(id);
    res.json({ message: "List deleted successfully" });

  } catch (err) {
    console.error("Error deleting list:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:imageId", async (req, res) => {
  try {

    const { name } = req.body;
    const {imageId} = req.params;

    const listData = await List.updateOne({ _id: imageId }, { $set: { name: name } });

    res.json({ message: "Image title updated", listData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
