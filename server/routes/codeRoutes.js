const express = require("express");

const router = express.Router();
const Record = require("../models/Codes");

router.get("/:status_code", async (req, res) => {
    try {
      const { status_code } = req.params;
  
      // Extract pattern (removing 'x')
      const pattern = status_code.replace(/x/g, ''); 
  
      // Construct regex to match anything starting with `pattern`
      const regexPattern = new RegExp(`^${pattern}.*$`, "i"); 
  
      // Query database using regex
      const records = await Record.find({ 
        status_code: { $regex: regexPattern } 
      });
  
      if (!records.length) {
        return res.status(404).json({ message: "No matching records found" });
      }
  
      res.json(records);
    } catch (error) {
        console.log("ERRROR", error)
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  });

module.exports = router;

