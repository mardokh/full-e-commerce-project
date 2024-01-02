// MODULES IMPORTATION  //
const {DataTypes} = require('sequelize')
const DB = require('../db.config')


// DEFINE MODEL //
const shoppingCart = DB.define('shopping_cart', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    client_id: {
        type: DataTypes.STRING(255)
    },
    product_id: {
        type: DataTypes.INTEGER(11),
        references: {
            model: 'products',
            key: 'id'
        }
    }
})


// EXPORTING //
module.exports = shoppingCart