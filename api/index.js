const serverless = require("serverless-http");
const app = require("../server");
const connectDB = require("../db");

module.exports.handler = async (event, context) => {
  await connectDB(); // اتصل مره وحده
  const handler = serverless(app);
  return handler(event, context);
};
