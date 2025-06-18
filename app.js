require("dotenv").config();
const express = require("express");
const connectDb = require("./dp/connectDb");
const app = express();
const PORT = process.env.PORT || 1000;
const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/userRoutes");
const categoriesRoutes = require("./routes/categoryRoutes");
const productsRoutes = require("./routes/productRoutes");

app.get("/", (req, res) => {
  res.send("Welcome to the AUVNET API");
});

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);

app.listen(PORT, async () => {
  try {
    await connectDb();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log("Error connecting to the database:", error);
    process.exit(1);
  }
});
