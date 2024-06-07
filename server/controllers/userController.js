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
  