const serverless = require("serverless-http");
const app = require("../server");
const connectDB = require("../db");

let handler;

const handlerFunction = async (req, res) => {
  if (!handler) {
    await connectDB();
    handler = serverless(app);
  }
  return handler(req, res);
};

module.exports = handlerFunction;
