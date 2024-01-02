//  MODULES IMPORTATION //
const express = require('express')
const controller = require('../controllers/shoppingCart') 


// EXPRESS ROUTER INSTANCIATE //
let router = express.Router()


// GET SHOPPING CART //
router.get('/carts', controller.getShoppingCart)


// ADD SHOPPING CART //
router.put('/carts/add', controller.addShoppingCart)


// DELETE SHOPPING CART //
router.delete('/carts/delete/:id', controller.deleteShoppingCart)


// EXPORTING
module.exports = router
