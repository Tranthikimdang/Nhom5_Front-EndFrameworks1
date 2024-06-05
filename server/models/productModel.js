const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Products = sequelize.define('Products', {
    productID : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    productType : {
        type: DataTypes.STRING,
        allowNull: false
    },
    productName : {
        type: DataTypes.STRING,
        allowNull: false
    },
    productImage : {
        type: DataTypes.STRING,
        allowNull: false
    },
    productPrice : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    expiryDate : {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity : {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
tableName : 'products'
});

module.exports = Products;


// productID: number;
// productType: string;
// productName: string;
// imageURL: string;
// price: number;
// expiryDate: string;
// quantity: number;
