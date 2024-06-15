const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');

router.get('/adminusers', adminController.getAllUser);
router.post('/adminuser', adminController.createUser);
router.put('/adminuser/:id', adminController.updateUser);
router.delete('/adminuser/:id', adminController.deleteUser);

module.exports = router;
