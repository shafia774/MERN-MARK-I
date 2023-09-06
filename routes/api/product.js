const express = require('express');
const router = express.Router();

const {getProducts} =require('../../app/controllers/ProductController')

router.route('/').get(getProducts);

module.exports = router