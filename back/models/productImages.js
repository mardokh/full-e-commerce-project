// MODULES IMPORTATION  //
const {DataTypes} = require('sequelize')
const DB = require('../db.config')


const productImages = DB.define('productImages', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    productId: {
        type: DataTypes.INTEGER(11),
        references: {
            model: 'products',
            key: 'id'
        }
    },
    images: {
        type: DataTypes.STRING(255),
    }
})


// EXPORTING //
module.exports = productImages