const serverless = require("serverless-http");
const app = require("../server");
const connectDB = require("../db");

module.exports = serverless(async (req, res) => {
  await connectDB();        // الآن نضمن الاتصال قبل أي راوت
  return app(req, res);
});
