const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/product', productController.getAllProduct);

router.post('/product', productController.createProduct);

router.put('/product/:id', productController.updateProduct);

router.delete('/product/:id', productController.deleteProduct);

module.exports = router;