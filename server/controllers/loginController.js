const { User } = require("../models");


exports.getAllUser = async (req, res) => {
  try {
    const users = await User.findAll(); // Lấy tất cả các bản ghi từ bảng users
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message || "Some error occurred while retrieving hotels.",
    });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const userId = req.params.id; // Lấy ID từ request params
    const user = await User.findByPk(userId); // Tìm người dùng theo ID

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message || "Some error occurred while retrieving the user.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra nếu người dùng tồn tại
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await user.validPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Tạo JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, 'secret_key', { expiresIn: '1h' }); // Thay 'secret_key' bằng khóa bí mật của bạn

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'An error occurred during login' });
  }
};


  