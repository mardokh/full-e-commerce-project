//  MODULES IMPORTS //
const express = require('express')
const controller = require('../controllers/favoriteProducts')


// EXPRESS ROUTER INSTANCIATE //
let router = express.Router()


// ADD FAVORITE PRODUCT //
router.put('/add', controller.addFavoriteProduct)


// GET ALL FAVORITES PRODUCTS //
router.get('', controller.getFavoritesProducts)


// DELETE AN FAVORITE PRODUCT //
router.delete('/delete/:id', controller.deleteFavoritesProducts)



// EXPORTS //
module.exports = router