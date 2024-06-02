const sequelize = require('../config/db');
const Comment = require('./commentModel');

const db = {
  sequelize,
  Comment
};

// Đồng bộ các model với cơ sở dữ liệu
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = db;
