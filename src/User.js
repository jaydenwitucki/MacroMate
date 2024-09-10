const express = require('express');
const router = express.Router();
const User = require('./models/User'); // Replace with the actual User model

router.post('/register', async (req, res) => {
  try {
    // Extract user registration data from the request body
    const { firstName, lastName, email, password, goal } = req.body;

    // Create a new user instance
    const newUser = new User({
      firstName,
      lastName,
      email,
      password, // Note: You should hash the password before saving it to the database
      goal,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
