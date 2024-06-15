const express = require('express');
const bodyParser = require('body-parser');
const commentRoute = require('./routes/commentRoutes');
const userRoute = require('./routes/userRoutes');
const categoryRoute = require('./routes/categoryRoutes');
const loginRoute = require('./routes/loginRouter');
const productRoutes = require('./routes/productRoutes');
const { sequelize } = require('./models');
// const Products = require('./models/productModel');
// const Category = require('./models/categoryModel');
const cors = require("cors");
const app = express();
const port = 3000;
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const authRoutes = require("./routes/loginRouter");
const orderRoutes = require('./routes/orderRoutes')

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


// app.post("/api/auth/login", (req, res) => {
//   const { email, password } = req.body;
//   // Xử lý đăng nhập
//   const loginSuccess = true; // Giả sử đăng nhập thành công
//   res.json({ success: loginSuccess });
// });



app.listen(port, async () => {
  await sequelize.sync();
  console.log(`Server is running on http://localhost:${port}`);
});
