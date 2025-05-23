const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.ACCESS_TOKEN;

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) =>{
    try {
        const user = await User.findById(req.params.id);

        if (!user){
          return res.status(404).json({message: "User not found"})
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body); 
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
  const name = req.body.username;
  const password = req.body.password;

  console.log("Request created: " + name + password);
  
  const user = await User.findOne({name});
  console.log("User found" + user);


  if(!user){
    return res.status(400).json({message: "User does not exist"});
  }else if(user.password !== password){
    return res.status(400).json({message: "Invalid credentials"});
  }

  const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: '1h'})
  res.status(200).json({token})
  } catch (error) {
    res.status(500).json({message: error.m})

  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body)

    if (!user){
      return res.status(404).json({message: "User not found"})
    }

    const updatedProduct = await Product.findById(req.params.id)
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error)
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




module.exports = router;