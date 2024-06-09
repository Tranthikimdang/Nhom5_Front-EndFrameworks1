const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/auth/login', productController.getAllProduct);

module.exports = router;
