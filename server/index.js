const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const commentRoute = require('./routes/commentRoutes');
const productRoute = require('./routes/productRoutes')
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

app.use('/api/', commentRoute);

app.use('/api/', productRoute);

app.listen(port, async () => {
  await sequelize.sync();
  console.log(`Server is running on http://localhost:${port}`);
});
