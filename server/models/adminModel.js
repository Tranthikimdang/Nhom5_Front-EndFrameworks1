const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserAdmin = sequelize.define('UserAdmin', {
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userPhone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userAddress: {
    type: DataTypes.TEXT,
    allowNull: false
  } 
}, {
  tableName: 'usersAdmin'
});

module.exports = UserAdmin;