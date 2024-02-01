// MODULES IMPORTATION  //
const {DataTypes} = require('sequelize')
const DB = require('../db.config')


// DEFINE MODEL //
const recipeNote = DB.define('recipe_note', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    client_id: {
        type: DataTypes.STRING(255),
    },
    recipe_id: {
        type: DataTypes.INTEGER(11)
    },
    note: {
        type: DataTypes.INTEGER(11)
    }
})


// EXPORTING //
module.exports = recipeNote