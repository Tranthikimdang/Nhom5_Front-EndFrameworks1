const express = require('express');
const bodyParser = require('body-parser');
const commentRoute = require('./routes/commentRoutes');
const userRoute = require('./routes/userRoutes');
const categoryRoute = require('./routes/categoryRoutes');
const loginRoute = require('./routes/loginRouter');
const productRoutes = require('./routes/productRoutes');
const { sequelize, UserAdmin } = require('./models');

const cors = require("cors");
const app = express();
const port = 3000;
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require("./routes/adminRoutes");
const statictiscRouter = require("./routes/statictiscRoutes");

// Cấu hình body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Thư mục lưu trữ tệp
  },
  filename: function (req, file, cb) {
    console.log(file);
    console.log(path.extname(file.originalname));
    cb(null, file.originalname); // Đặt tên tệp
  },
});

const upload = multer({ storage: storage });
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/", commentRoute);
app.use("/api/", userRoute);
app.use("/api/", categoryRoute);
app.use("/api", productRoutes);
app.use("/api/auth", loginRoute); // Đường dẫn mới cho các tác vụ liên quan đến xác thực
app.use('/api/', orderRoutes);
app.use('/api/', adminRoutes);
app.use("/api", statictiscRouter);

app.put('/api/order', (req, res) => {
  // Logic to update the order
  const order = req.body;
  // Assume you have a function to update order in your database
  updateOrder(order).then(() => {
    res.status(200).send({ status: 'success', data: order });
  }).catch(err => {
    res.status(500).send({ status: 'error', message: err.message });
  });
});


app.get('/api/auth/checkUserExists', (req, res) => {
  const email = req.query.email;
  // Kiểm tra sự tồn tại của user với email
  const userExists = true; // Giả sử người dùng tồn tại
  res.json(userExists);
});

app.post("/upload", upload.single("image"), (req, res) => {
  if (req.file) {
    // Trả về đường dẫn của ảnh
    const imagePath = `http://localhost:${port}/uploads/${req.file.filename}`;
    res.status(201).json({
      status: 201,
      message: "Tải lên thành công!",
      imagePath: imagePath,
    });
  } else {
    res.status(400).json({ message: "Tải lên thất bại!" });
  }
});


app.get('/products', async (req, res) => {
  try {
    const products = await Products.findAll({
      include: [{
        model: Category,
        attributes: ['categoryName'] // Chỉ lấy tên danh mục
      }]
    });

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, async () => {
  await sequelize.sync();
  console.log(`Server is running on http://localhost:${port}`);
});
