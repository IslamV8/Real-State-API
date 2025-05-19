// api/index.js

require("dotenv").config();
const serverless = require("serverless-http");
const express = require("express");
const connectDB = require("../db");          // <— استدعاء دالة الاتصال
const app = require("./server");             // <— المسار الصحيح لملف server.js

// اتصل بقاعدة البيانات أول ما يبدأ السيرفر
connectDB()
  .then(() => console.log("DB connected, starting server…"))
  .catch(err => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });

// ربط الراوتات والـ middleware
app.use(express.json());
// ... باقي الـ routes

module.exports = serverless(app);
