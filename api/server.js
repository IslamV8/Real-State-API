// api/server.js
const express = require("express");
const app = express();

// 1) Body parser
app.use(express.json());

app.get("/ping", (req, res) => {
  console.log("→ /ping hit"); 
  return res.status(200).json({ ok: true });
});

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

/// 3) مسار 404 نهائي
app.use((req, res) => {
  console.log("→ 404 for", req.path);
  return res.status(404).json({ error: "Not found" });
});

module.exports = app;