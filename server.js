require("dotenv").config();
const express = require("express");
const connectDB = require("./db"); // استيراد الاتصال
const app = express();

app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes.js");
app.use("/api/auth", authRoutes);

const propertyRoutes = require("./routes/propertyRoutes");
app.use("/api/properties", propertyRoutes);

const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);

// الاتصال بقاعدة البيانات مرة واحدة
connectDB();

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running locally on http://localhost:${PORT}`);
  });
}

module.exports = app;
