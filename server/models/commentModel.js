const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Comment = sequelize.define('Comment', {
  commentsId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  commentsEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  productName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  commentsContent: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'comments'
});

module.exports = Comment;