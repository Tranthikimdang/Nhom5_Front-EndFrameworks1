const express = require('express');
const router = express.Router();
const orderController =  require('../controllers/orderController');

router.get('/orders', orderController.getAllOrder);
router.post('/order', orderController.createOrder);
router.put('/order/:id', orderController.updateOrder);
router.delete('/order/:id', orderController.deleteOrder);

module.exports = router;
