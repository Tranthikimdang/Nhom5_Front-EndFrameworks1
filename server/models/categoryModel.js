const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('Category', {
  cateId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cateName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'categories'
});

module.exports = Category;