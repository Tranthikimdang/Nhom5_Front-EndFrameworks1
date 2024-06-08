const sequelize = require('../config/db');
const Comment = require('./commentModel');
const Product = require('./productModel');
const Order = require('./orderModel')

const db = {
  sequelize,
  Comment,
  Product,
  Order
};

// Đồng bộ các model với cơ sở dữ liệu
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = db;
