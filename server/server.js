require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const authRoutes = require("./routes/authRoutes");
const listRoutes = require("./routes/listRoutes");
const searchRoutes = require('./routes/search.js')
const  authenticate = require('./midddleware/authMiddleware.js')
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Failed", err));

// app.use(authenticate)
app.use("/api/auth", authRoutes); 
app.use("/", searchRoutes);
app.use("/api/lists",listRoutes);


app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
