
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/userController');

router.post('auth/login', loginController.getUserByEmail);
router.get('/users', loginController.getAllUser);
router.get('/users/:email', loginController.getUserByEmail);
router.post('/login', loginController.getUserByEmailAndPassword);
module.exports = router;


// router.get('auth/login', loginController.getAllUser);
// router.get('auth/login/:email', loginController.getUserByEmail);
// router.post('/login', loginController.getUserByEmailAndPassword);
// module.exports = router;

