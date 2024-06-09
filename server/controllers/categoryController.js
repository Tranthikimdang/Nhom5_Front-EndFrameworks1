const { Category } = require("../models");

exports.getAllCategory = async (req, res) => {
  try {
    const categories = await Category.findAll(); // Lấy tất cả các bản ghi từ bảng categorys
    res.status(200).json({
      status: "success",
      results: categories.length,
      data: {
        categories,
      },
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message || "Some error occurred while retrieving hotels.",
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { cateName} = req.body; // 

    console.log(req.body);
    const newCategory = await Category.create({ cateName});
    res.status(201).json({ status: "success", data: { hotel: newCategory } });
  } catch (err) {
    console.error("Error creating hotel:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params; 
    const { cateName } = req.body;

    const category = await Category.findByPk(id);

    if (!category) {
      return res
        .status(404)
        .json({ status: "error", message: "Không tìm thấy category" });
    }

    category.cateName = cateName;

    await category.save();

    res.status(200).json({ status: "success", data: category });
  } catch (err) {
    console.error("Lỗi khi cập nhật category:", err);
    res.status(500).json({ status: "error", message: "Lỗi máy chủ nội bộ" });
  }
};


exports.deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
      
      // Kiểm tra khách sạn tồn tại
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ status: "error", message: "Không tìm thấy khách sạn" });
      }
  
      // Xóa khách sạn
      await category.destroy();
  
      res.status(200).json({ status: "success", message: "Xóa thành công" });
    } catch (err) {
      console.error("Lỗi khi xóa khách sạn:", err);
      res.status(500).json({ status: "error", message: "Lỗi máy chủ nội bộ" });
    }
  };
  