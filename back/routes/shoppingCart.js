//  MODULES IMPORTS //
const express = require('express')
const controller = require('../controllers/shoppingCart') 


// EXPRESS ROUTER INSTANCIATE //
let router = express.Router()


// GET SHOPPING CART //
router.get('/carts', controller.getShoppingCart)


// ADD SHOPPING CART //
router.put('/carts/add', controller.addShoppingCart)


// DELETE ON SHOPPING CART //
router.delete('/carts/delete/:id', controller.deleteShoppingCart)


// DELETE SOMES SHOPPING CARTS //
router.delete('/carts/delete/somes/:id', controller.deleteSomeShoppingCarts)


// EXPORTS //
module.exports = router
