//  MODULES IMPORTATION //
const express = require('express')
const controller = require('../controllers/products')
const multer = require('multer')
const path = require('path')
const checkTokenMIddleware = require('../jsonwebtoken/check_jwt_endPoints')


// EXPRESS ROUTER INSTANCIATE //
let router = express.Router()


//  GET ALL PRODUCTS  //
router.get('', controller.getAllProducts)


//  GET ONE PRODUCT  //
router.get('/:id', controller.getOneProduct)


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


// PUT PRODUCT //
router.put('/add', upload.single('image'), checkTokenMIddleware, controller.putProduct)


// UPDATE PRODUCT //
router.patch('/update', upload.single('image'), checkTokenMIddleware, controller.updateProduct)


// TRASH PRODUCT //
router.delete('/trash/:id', checkTokenMIddleware, controller.trasProduct)


// UNTRASH PRODUCT //
router.post('/untrash/:id', checkTokenMIddleware, controller.untrashProduct)


// DELETE PRODUCT //
router.delete('/delete/:id', checkTokenMIddleware, controller.deleteProduct)



// EXPORTS //
module.exports = router