require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

connectDB();

app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes.js");
app.use("/api/auth", authRoutes);

const propertyRoutes = require("./routes/propertyRoutes");
app.use("/api/properties", propertyRoutes);

const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running locally on http://localhost:${PORT}`);
  });
}

module.exports = app;
