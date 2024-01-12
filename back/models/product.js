// MODULES IMPORTATION  //
const {DataTypes} = require('sequelize')
const DB = require('../db.config')


const product = DB.define('product', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        defaultValue: ''
    },
    details: {
        type: DataTypes.STRING(255),
        defaultValue: ''
    },
    price: {
        type: DataTypes.DECIMAL(30, 2),
    },
    note: {
        type: DataTypes.DECIMAL(30, 2)
    },
    image: {
        type: DataTypes.STRING(255),
        defaultValue: ''
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {paranoid: true})



// EXPORTS //
module.exports = product