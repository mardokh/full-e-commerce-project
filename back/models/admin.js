// MODULES IMPORTATION  //
const {DataTypes} = require('sequelize')
const DB = require('../db.config')


// DEFINE MODEL //
const admin = DB.define('admin', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    identifiant: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        is: /^[0-9a-f]{64}$/i // contrainte on password encoding
    },
}, {
    freezeTableName: true, // Disable automatic pluralization
})


// EXPORTS //
module.exports = admin