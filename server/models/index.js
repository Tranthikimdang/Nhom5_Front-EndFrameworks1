const sequelize = require('../config/db');
const Comment = require('./commentModel');
const Product = require('./productModel')

const db = {
  sequelize,
  Comment,
  Product
};

// Đồng bộ các model với cơ sở dữ liệu
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = db;
