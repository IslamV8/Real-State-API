// api/server.js
const express = require("express");
const app = express();

// 1) Body parser
app.use(express.json());

// 2) الراوتات بدون بادئة "/api"
const authRoutes      = require("../routes/authRoutes");
const propertyRoutes  = require("../routes/propertyRoutes");
const dashboardRoutes = require("../routes/dashboardRoutes");
const commentRoutes   = require("../routes/commentRoutes");

// ⚠️ هنا حمِّل الراوتات هكذا:
app.use("/auth",      authRoutes);
app.use("/properties", propertyRoutes);
app.use("/dashboard",  dashboardRoutes);
app.use("/comments",   commentRoutes);

// 3) مسار افتراضي لكلِّ شيء آخر (404)
app.use("*", (req, res) => {
  res.status(404).json({ error: "Not Found" });
});

module.exports = app;
