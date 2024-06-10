const { User } = require("../models");
const bcrypt = require('bcrypt');

exports.getUserByEmailAndPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { userEmail: email } });
console.log(user.password, password);

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);
//     if (!isPasswordValid) {
//       console.log("haha");
//       return res.status(401).json({ status: 'error', message: 'Invalid password' });
//     }

//     const token = jwt.sign({ id: user.userId, email: user.userEmail }, 'secret_key', { expiresIn: '1h' });

//     res.status(200).json({ status: 'success', data: { user, token } });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: 'error', message: err.message || 'Some error occurred while retrieving the user.' });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email; // Lấy email từ request params
    const user = await User.findOne({ where: { userEmail: email } }); // Tìm người dùng theo email

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

exports.createUser = async (req, res) => {
  try {
    const { userName, userEmail , userPhone, userAddress} = req.body; // 

    console.log(req.body);
    const newUser = await User.create({ userName, userEmail , userPhone, userAddress });
    res.status(201).json({ status: "success", data: { hotel: newUser } });
  } catch (err) {
    console.error("Error creating hotel:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params; 
    const { userName, userEmail , userPhone, userAddress} = req.body; // 
    
    console.log(id);

    const user = await User.findByPk(id);

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "Không tìm thấy user" });
    }

    user.userName = userName;
    user.userEmail = userEmail;
    user.userPhone = userPhone;
    user.userAddress = userAddress;

    await user.save();

    res.status(200).json({ status: "success", data: { User } });
  } catch (err) {
    console.error("Lỗi khi cập nhật User:", err);
    res.status(500).json({ status: "error", message: "Lỗi máy chủ nội bộ" });
  }
};

exports.deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      
      // Kiểm tra khách sạn tồn tại
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ status: "error", message: "Không tìm thấy khách sạn" });
      }
  
      // Xóa khách sạn
      await user.destroy();
  
      res.status(200).json({ status: "success", message: "Xóa thành công" });
    } catch (err) {
      console.error("Lỗi khi xóa khách sạn:", err);
      res.status(500).json({ status: "error", message: "Lỗi máy chủ nội bộ" });
    }
  };
  