
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/AdminController');

router.post('auth/login', loginController.getUserByEmail);
router.get('/users', loginController.getAllUser);
router.get('/users/:email', loginController.getUserByEmail);
router.post('/login', loginController.getUserByEmailAndPassword);
module.exports = router;




