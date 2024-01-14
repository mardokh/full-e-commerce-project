//  MODULES IMPORTS //
const express = require('express')
const controller = require('../controllers/favoriteProducts')


// EXPRESS ROUTER INSTANCIATE //
let router = express.Router()

// ADD SHOPPING CART //
router.put('/add', controller.addFavoriteProduct)



// EXPORTS //
module.exports = router