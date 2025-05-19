require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// ——— الراوتات ———
const authRoutes = require("../routes/authRoutes.js");
const propertyRoutes = require("../routes/propertyRoutes.js");
const dashboardRoutes = require("../routes/dashboardRoutes.js");
const commentRoutes = require("../routes/commentRoutes.js");

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api", commentRoutes);

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally on http://localhost:${PORT}`);
  });
}
