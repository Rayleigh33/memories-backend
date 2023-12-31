const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const secret = 'test';

 const signin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const oldUser = await User.findOne({ email });
  
      if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
  
      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
  
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.status(200).json({ result: oldUser, token });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };


  const signup = async (req, res) => {
    const { email, password,confirmPassword ,firstName, lastName } = req.body;
  
    try {
      const oldUser = await User.findOne({ email });
  
      if (oldUser) return res.status(400).json({ message: "User already exists" });

      if(password !== confirmPassword) return res.status(400).json({ message: "Password don't match with confirm password" });
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
  
      const token = jwt.sign( { email: result.email, id: result._id }, process.env.JWT_SECRET, { expiresIn: "2h" } );
      console.log(token);
  
      res.status(201).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      
      console.log(error);
    }
  };

  module.exports = {signin,signup};