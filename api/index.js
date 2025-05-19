const serverless = require("serverless-http");
const app = require("../server");
const connectDB = require("../db");

// ❗ هنا: لم ننتظر الاتصال
connectDB();

module.exports = serverless(app);
