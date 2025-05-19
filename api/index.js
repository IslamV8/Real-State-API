const serverless = require("serverless-http");
const app = require("../server");
const connectDB = require("../db");

// ❗ connectDB once before exporting the handler
connectDB();

module.exports = serverless(app);
