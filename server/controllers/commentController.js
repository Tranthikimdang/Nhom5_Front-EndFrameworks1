const { Comment } = require("../models");

exports.getAllComment = async (req, res) => {
  console.log(req.query);
  try {
    const page = parseInt(req.query.page, 10) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 items per page if not provided
    const offset = (page - 1) * limit;

    const { count, rows: comments } = await Comment.findAndCountAll({
      limit: limit,
      offset: offset,
    });

    res.status(200).json({
      status: "success",
      results: comments.length,
      data: {
        comments,
      },
      pagination: {
        page: page,
        limit: limit,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
      },
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message || "Some error occurred while retrieving comments.",
    });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { userName, commentsEmail, productName, imageUrl, commentsContent } = req.body; // r 

    console.log(req.body);
    const newComment = await Comment.create({ userName, commentsEmail, productName, imageUrl, commentsContent });
    res.status(201).json({ status: "success", data: { hotel: newComment } });
  } catch (err) {
    console.error("Error creating hotel:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, commentsEmail, productName, imageUrl, commentsContent } = req.body;

    console.log(id);

    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res
        .status(404)
        .json({ status: "error", message: "Không tìm thấy khách sạn" });
    }

    comment.userName = userName;
    comment.commentsEmail = commentsEmail;
    comment.productName = productName;
    comment.imageUrl = imageUrl;
    comment.commentsContent = commentsContent;

    await comment.save();

    res.status(200).json({ status: "success", data: { comment } });
  } catch (err) {
    console.error("Lỗi khi cập nhật comment:", err);
    res.status(500).json({ status: "error", message: "Lỗi máy chủ nội bộ" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra khách sạn tồn tại
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ status: "error", message: "Không tìm thấy khách sạn" });
    }

    // Xóa khách sạn
    await comment.destroy();

    res.status(200).json({ status: "success", message: "Xóa thành công" });
  } catch (err) {
    console.error("Lỗi khi xóa khách sạn:", err);
    res.status(500).json({ status: "error", message: "Lỗi máy chủ nội bộ" });
  }
};
