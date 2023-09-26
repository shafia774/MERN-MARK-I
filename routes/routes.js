// routes.js
const express = require('express');
const router = express.Router();

// Define your routes here
router.use('/api/v1/products', require('./api/product'));
// router.use('/api/v1/apps', require('./api/app'));



module.exports = router;

