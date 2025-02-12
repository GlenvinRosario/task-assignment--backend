const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  images: [
    {
      url: String,
      title: String,
      status_code: Number,
      created_at: { type: Date, default: Date.now }
    }
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("List", ListSchema);
