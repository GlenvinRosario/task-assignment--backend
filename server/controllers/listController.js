const List = require("../models/List");

exports.createList = async (req, res) => {
  try {
    const { name, responseCodes } = req.body;
    const list = await List.create({ userId: req.userId, name, responseCodes });
    res.status(201).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getLists = async (req, res) => {
  try {
    const lists = await List.find().sort({ created_at: -1 }); 
    res.json(lists);
  } catch (error) {
    console.error("Error fetching lists:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getLists };


exports.getListById = async (req, res) => {
  const list = await List.findOne({ _id: req.params.id, userId: req.userId });
  if (!list) return res.status(404).json({ error: "List not found" });
  res.json(list);
};

const axios = require("axios");

exports.getHttpDogImage = async (req, res) => {
  const { code } = req.params; 

  try {
    const response = await axios.get(`https://http.dog/${code}.jpg`, {
      responseType: "arraybuffer", 
    });

    res.setHeader("Content-Type", "image/jpeg");
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching image:", error.message);
    res.status(500).json({ error: "Failed to fetch the image" });
  }
};

exports.updateList = async (req, res) => {
  try {
    const updatedList = await List.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { $set: req.body },
      { new: true }
    );
    res.json(updatedList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteList = async (req, res) => {
  await List.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: "List deleted" });
};
