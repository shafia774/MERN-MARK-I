const express = require('express');
const ProductController =require('../../app/controllers/ProductController')
const AuthController =require('../../app/controllers/AuthController')

const router = express.Router();


router.route('/').get(ProductController.getProducts)
                .post(AuthController.protect ,ProductController.storeProduct)
                .delete(ProductController.deleteAllProducts);
router.route('/:id').get(ProductController.getProduct)
                    .patch(ProductController.updateProduct)
                    .delete(ProductController.deleteProduct);

module.exports = router