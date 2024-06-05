const sequelize = require('../config/db');
const Comment = require('./commentModel');
const User = require('./userModel');
const Category = require('./categoryModel');

const db = {
  sequelize,
  Comment,
  User,
  Category
};

// Đồng bộ các model với cơ sở dữ liệu
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = db;
