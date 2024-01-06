// MODULES IMPORTATION  //
const {DataTypes} = require('sequelize')
const DB = require('../db.config')

const recipe = DB.define('recipe', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        defaultValue: ''
    },
    description: {
        type: DataTypes.TEXT,
        defaultValue: ''
    },
    image: {
        type: DataTypes.STRING(255),
        defaultValue: ''
    },
    note: {
        type: DataTypes.DECIMAL(30,2)
    }
}, {paranoid: true})

module.exports = recipe