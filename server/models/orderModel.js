const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('Order', {
    orderID : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    client : {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date : {
        type: DataTypes.STRING,
        allowNull: false
    },
    valueOrder : {
        type: DataTypes.STRING,
        allowNull: false
    },
    payment : {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName : 'orders'
});

module.exports = Order;