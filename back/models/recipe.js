// MODULES IMPORTATION  //
const {DataTypes} = require('sequelize')


module.exports = (sequelize) => {
    return recipe = sequelize.define('recipe', {
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
        favrcp: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        image: {
            type: DataTypes.STRING(255),
            defaultValue: ''
        },
        note: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {paranoid: true})
}
