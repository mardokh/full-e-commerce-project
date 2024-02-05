//  MODULES IMPORTS //
const express = require('express')
const controller = require('../controllers/admin')

// EXPRESS ROUTER INSTANCIATE //
let router = express.Router()


// CREATE ADMIN //
router.put('/add', controller.createAdmin)


// EXPORT MODULES
module.exports = router