// MODULES IMPORTATION  //
const {DataTypes} = require('sequelize')
const DB = require('../db.config')



// DEFINE MODEL //
const productNote = DB.define('product_note', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(255),
    },
    product_id: {
        type: DataTypes.INTEGER(11)
    },
    note: {
        type: DataTypes.INTEGER(11)
    }
})


// EXPORTING //
module.exports = productNote