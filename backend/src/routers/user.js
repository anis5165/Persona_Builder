const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      // return so we don't fall through and try to send another response
      return res.status(400).json({ error: 'Email already in use' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already in use' });
    }
    
    const newUser = await User.create({ name, email, username, password });
    return res.status(201).json({ user: newUser });
  } catch (err) {
    console.error(err);
    // Only send an error response if a response hasn't already been sent
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Server error' });
    }
  }
});


router.post('/login', async (req, res) => {
    // users can login with either their username or email using jwt for authentication
    try {
        const { identifier, password } = req.body; // identifier can be either username or email

        if (!identifier || !password) {
            return res.status(400).json({ message: 'Identifier and password are required.' });
        }

        const user = await User.findOne({ 
            $or: [{ email: identifier }, { username: identifier }] 
        });

        if (!user){
            return res.status(404).json({ message: 'User not found.' });
        }

        if (password !== user.password){
            return res.status(401).json({ message: 'Invalid password.' });
        }

        const payload = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' },
            (err, token) => {
                if (err) {
                    return res.status(500).json({ message: 'Error generating token.' });
                }
                else{
                    return res.status(200).json({token: token});
                }
            }
        )
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;