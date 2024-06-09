// loginRouter.js

const express = require('express');
const router = express.Router();
const { login } = require('../service/auth.service'); // Adjust the path as per your directory structure

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // In ra dữ liệu nhận được từ client để kiểm tra
    console.log('Email từ client:', email);
    console.log('Mật khẩu từ client:', password);

    // Thực hiện đăng nhập với email và password nhận được từ req.body
    const user = await login(email, password);
    res.json({ user }); // Trả về thông tin người dùng sau khi đăng nhập thành công
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
});


module.exports = router;
