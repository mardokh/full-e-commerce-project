//  MODULES IMPORTS //
const express = require('express')
const controller = require('../controllers/productNotes')


// EXPRESS ROUTER INSTANCIATE //
let router = express.Router()


// ADD PRODUCT NOTE //
router.put('/add', controller.addProductNote)


// EXPORTS //
module.exports = router