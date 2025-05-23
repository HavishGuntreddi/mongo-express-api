const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.ACCESS_TOKEN

//routes
const productRoute = require("./routes/product.route")
const userRoute = require("./routes/user.route");

//models
//const Product = require("./models/product.model");
//const User = require("./models/user.model");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use("/api/products", productRoute);
app.use("/api/users", userRoute);


mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => console.log("Server running"));
  })
  .catch(() => {
    console.log("Connection fail");
  });
