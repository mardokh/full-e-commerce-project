// MODULES IMPORTATION //
const {Sequelize} = require('sequelize')


//  CONNECT TO DATABASSE  //
let sequelize = new Sequelize (
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.HOST_NAME,
        dialect: 'mysql',
        logging: false
    }
)


// EXPORTING  //
module.exports = sequelize