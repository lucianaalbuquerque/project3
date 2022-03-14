const router = require("express").Router();

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const User = require("../models/User.model");

// Require necessary middleware in order to control access to specific routes
const { isAuthenticated } = require('./../middleware/jwt.middleware.js');


router.post("/signup", (req, res) => {
  const { email, password, name } = req.body;

  if (email === '' || password === '' || name === '') {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Provide a valid email address.' });
    return;
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
    return;
  }

  // Search the database for a user with the username submitted in the form
  User.findOne({ email })
    .then((foundUser) => {
      // If the user with the same email already exists, send an error response
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }
  
    // If email is unique, proceed to hash the password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create the new user in the database
    // We return a pending promise, which allows us to chain another `then` 
    return User.create({ email, password: hashedPassword, name });
  })
  .then((createdUser) => {
    // Deconstruct the newly created user object to omit the password
    // We should never expose passwords publicly
    const { email, name, _id } = createdUser;
  
    // Create a new object that doesn't expose the password
    const user = { email, name, _id };

    // Send a json response containing the user object
    res.status(201).json({ user: user });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" })
  });
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
 
  if (email === '' || password === '') {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }
 
  
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {   
        res.status(401).json({ message: "User not found." })
        return;
      }
 
      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
 
      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email, name } = foundUser;
        
        // Create an object that will be set as the token payload
        const payload = { _id, email, name };
 
        // Create and sign the token
        const authToken = jwt.sign( 
          payload,
          process.env.TOKEN_SECRET,
          { algorithm: 'HS256', expiresIn: "6h" }
        );
 
        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      }
      else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
 
    })
    .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});

router.get('/verify', isAuthenticated, (req, res, next) => {  
  console.log(`req.payload`, req.payload);
  res.status(200).json(req.payload);
});

module.exports = router;
