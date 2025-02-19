const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  result : [
    {
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
    }
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("List", ListSchema);
