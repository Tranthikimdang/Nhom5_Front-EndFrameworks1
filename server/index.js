const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const commentRoute = require('./routes/commentRoutes');
const userRoute = require('./routes/userRoutes');
const categoryRoute = require('./routes/categoryRoutes');
const loginRoute = require('./routes/loginRouter');
const productRoutes = require('./routes/productRoutes');
const { sequelize } = require('./models');
const cors = require('cors');
const app = express();
const port = 3000;

// Cấu hình body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Hoặc cấu hình CORS chi tiết hơn nếu cần
// app.use(cors({
//   origin: 'http://your-frontend-url.com', // Chỉ cho phép từ domain cụ thể
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true, // Cho phép gửi cookies nếu cần
//   optionsSuccessStatus: 204
// }));

app.use('/api/', commentRoute,);
app.use('/api/', userRoute);
app.use('/api/', categoryRoute);
app.use('/api/products', productRoutes);


app.get('/api/auth/checkUserExists', (req, res) => {
  const email = req.query.email;
  // Kiểm tra sự tồn tại của user với email
  const userExists = true; // Giả sử người dùng tồn tại
  res.json(userExists);
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  // Xử lý đăng nhập
  const loginSuccess = true; // Giả sử đăng nhập thành công
  res.json({ success: loginSuccess });
});

app.listen(port, async () => {
  await sequelize.sync();
  console.log(`Server is running on http://localhost:${port}`);
});
