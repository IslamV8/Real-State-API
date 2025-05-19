// api/index.js
require("dotenv").config();
const serverless = require("serverless-http");
const connectDB = require("../db");      // دالة الاتصال بالـ MongoDB
const app = require("./server");         // استيراد Express app من server.js

// 1) اتّصال قاعدة البيانات قبل استقبال أي طلب
(async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected, starting handler…");
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }
})();

// 2) تصدير الـ handler المُغَلَّف بـ serverless-http
module.exports = serverless(app);
