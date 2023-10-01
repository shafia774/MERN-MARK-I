const express = require('express');
const router = express.Router();

// const {getProducts,storeProducts} =require('../../app/controllers/ProductController')
const Products =require('../../app/controllers/ProductController')

router.route('/').get(Products.getProducts)
                .post(Products.storeProduct)
                .delete(Products.deleteAllProducts);
router.route('/:id').get(Products.getProduct)
                    .patch(Products.updateProduct)
                    .delete(Products.deleteProduct);

module.exports = router