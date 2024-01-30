//  MODULES IMPORTS //
const express = require('express')
const controller = require('../controllers/productNotes')
const multer = require('multer')


// EXPRESS ROUTER INSTANCIATE //
let router = express.Router()

// MULTER CONFIGURATION FOR STORING IMAGES //
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null,"./uploads")
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`)
    }
})
var upload = multer({
    storage: storage
})


// ADD PRODUCT NOTE //
router.put('/add', upload.single('image'), controller.addProductNote)


// EXPORTS //
module.exports = router