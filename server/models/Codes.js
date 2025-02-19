const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  image: {
    type: Object, 
  },
  status_code: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
}, { timestamps: true }); 

const Record = mongoose.model("Codes", recordSchema);

module.exports = Record;
