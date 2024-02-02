// MODULES IMPORTS //
const { v4: uuidv4 } = require('uuid')
const FavoriteProduct = require('../models/favoriteProduct')
const Product = require('../models/product')



// GLOBALS VARIABLS //
const cookieName = 'client_id_favorites_products'


// ADD FAVORITE PRODUCT //
exports.addFavoriteProduct = async (req, res) => {

    try {
        // IF CLIENT HAS COOKIE WITH SPECIFIED COOKIENAME //
        if (req.cookies && req.cookies[cookieName]) {

            // Extract client id
            const client_id = req.cookies[cookieName]

            // Extract product id
            const product_id = req.body.id
            
            // Check params
            if (!product_id) {
                return res.status(400).json({ message: 'Product ID is missing in the request body !' });
            }

            // Set entrie
            const client_favoriteProduct = {
                client_id: client_id,
                product_id: product_id
            }

            // Create favorite product
            await FavoriteProduct.create(client_favoriteProduct)
            
            // Get favorites products
            const favorites_products = await FavoriteProduct.findAll({ where: { client_id: client_id } })

            // Check products
            if (!favorites_products) {
                return res.status(404).json({ message: 'Favorites products not found' })
            }

            // Send successfully 
            return res.json({ data: favorites_products })
        }

        else {
            // IF CLIENT DOESN'T HAVE COOKIE WITH SPECIFIED COOKIENAME //
            const productId = req.body.id

            // Check params
            if (!productId) {
                return res.status(400).json({ message: 'Product ID is missing in the request body !' })
            }

            // Create clien id
            const clientId = uuidv4()

            // Set entrie
            const client_favoriteProduct = {
                client_id: clientId,
                product_id: productId
            }

            // Create favorite product
            await FavoriteProduct.create(client_favoriteProduct)

            // Get favorites products
            const favorites_products = await FavoriteProduct.findAll({ where: { client_id: clientId} })

            // Check if favorites products exists
            if (!favorites_products) {
                return res.status(404).json({ message: 'Favorites products not found' })
            }

            // Create & send cookie
            res.cookie(cookieName, clientId, { maxAge: 30 * 24 * 60 * 60 * 1000})

            // Send Successfully 
            return res.json({ data: favorites_products })
        } 
    }
    catch (err) {
        return res.status(500).json({ message: 'Database error !', error: err.message, stack: err.stack })
    }
}


// GET FAVORITES PRODUCTS //
exports.getFavoritesProducts = async (req, res) => {

    try {
        // CHECK IF CLIENT HAS COOKIE WITH SPECIFIED COOKIENAME
        if (req.cookies && req.cookies[cookieName]) {

            // Extract client id 
            const client_id = req.cookies[cookieName]

            // Get all favorites products from database
            const favoritesProducts = await FavoriteProduct.findAll({where: {client_id: client_id},
                include: [{ model: Product, attributes: ['id', 'name', 'price'], as: 'favorite_product' }]})
            
            // IF THE CLIENT HASN'T ADDED ANY FAVORITE
            if (!favoritesProducts.length > 0) {
                return res.json({ data: "aucun produit favori" })
            }
            else {
                // Send favorites products to the client
                return res.json({ data: favoritesProducts })
            }    
        }
        else {
            // IF CLIENT DOESN'T HAVE CLIENT HAS COOKIE WITH SPECIFIED COOKIENAME
            return res.json({ data: "aucun produit favori" })
        }
    }
    catch (err) {
        return res.status(500).json({ message: 'Database error !', error: err.message, stack: err.stack })
    }
}


// DELETE FAVORITE PRODUCT //
exports.deleteFavoritesProducts = async (req, res) => {

    try {
        // Extract id
        const favoriteProductId = req.params.id

        // Delete favorite product
        await FavoriteProduct.destroy({where: {product_id: favoriteProductId}, force: true})

        // Send successfully
        return res.json({data: 'favorite product deleted successfully'})
    }
    catch (err) {
        return res.status(500).json({ message: 'Database error!', error: err.message, stack: err.stack })
    }
}

// GET FAVORITES PRODUCTS COUNT //
exports.getFavoritesProductsCount = async (req, res) => {

    try {
        // IF CLIENT HAS COOKIE WITH SPECIFIED COOKIENAME //
        if (req.cookies && req.cookies[cookieName]) {

            // Extract cookie 
            const client_id = req.cookies[cookieName]

            // Get favorites products
            const favorites_products = await FavoriteProduct.findAll({ where: { client_id: client_id } })

            // Check if favorites products exists
            if (!favorites_products) {
                return res.status(404).json({ message: 'Favorites products not found' })
            }

            // Send successfully 
            return res.json({ data: favorites_products })
        }
    }
    catch (err) {
        return res.status(500).json({ message: 'Database error!', error: err.message, stack: err.stack })
    }
}