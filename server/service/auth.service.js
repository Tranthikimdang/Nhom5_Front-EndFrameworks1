// auth.service.js

// Import các thư viện cần thiết
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Đảm bảo import đúng model User

// Hàm để thực hiện đăng nhập
async function login(email, password) {
  // Tìm kiếm người dùng với email được cung cấp
  const user = await User.findOne({ where: { email } });
  
  // Kiểm tra nếu không tìm thấy người dùng
  if (!user) {
    throw new Error('User not found');
  }

  // Kiểm tra mật khẩu
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Incorrect password');
  }

  // Tạo JWT token
  const token = jwt.sign({ userId: user.id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });

  // Trả về thông tin người dùng và token
  return { user: { id: user.id, email: user.email }, token };
}

module.exports = {
  login,
};
