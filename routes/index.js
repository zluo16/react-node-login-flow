const express = require('express');
const router = express.Router();
const path = require('path');
const api = require('./api');

// Set up API in router
router.use('/api', api);

module.exports = router;
