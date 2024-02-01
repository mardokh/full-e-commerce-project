//  MODULES IMPORTS //
const express = require('express')
const controller = require('../controllers/productNotes')
const multer = require('multer')


// EXPRESS ROUTER INSTANCIATE //
let router = express.Router()

// MULTER INSTANCIATE //
const upload = multer()

// ADD PRODUCT NOTE //
router.put('/add', upload.none(), controller.addProductNote)


// EXPORTS //
module.exports = router