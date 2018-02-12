const express = require('express');
const router = express.Router();
const passport = require('passport');
const Users = require('../models/user');

// Signup
router.post('/signup', passport.authenticate('signup'), (req, res) => {
  res.json(req.user);
})

// Login
router.post('/login', passport.authenticate('login'), (req, res) => {
  res.json(req.user);
})

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.send({ message: 'Logout Successful' });
});

module.exports = router;
