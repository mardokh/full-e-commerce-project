// MODULES IMPORTS //
const { v4: uuidv4 } = require('uuid')
const FavoriteProduct = require('../models/favoriteProduct')
const Product = require('../models/product')


// GLOBALS VARIABLS //
const cookieName = 'client_id_favorites_products'


// ADD FAVORITEPRODUCT //
exports.addFavoriteProduct = async (req, res) => {

    try {
        // IF CLIENT HAS (client_id) COOKIE //
        if (req.cookies && req.cookies[cookieName]) {

            // Extract cookie 
            const client_id = req.cookies[cookieName]

            // Extract id
            const product_id = req.body.id;
            
            // Check params
            if (!product_id) {
                return res.status(400).json({ message: 'Product ID is missing in the request body!' });
            }

            // Set entrie
            const client_favoriteProduct = {
                client_id: client_id,
                product_id: product_id
            }

            // Entries loop creator
            await FavoriteProduct.create(client_favoriteProduct);
            
            // Get product
            const product = await Product.findOne({ where: { id: product_id } })

            // Check products
            if (!product) {
                return res.status(404).json({ message: 'Favorite product not found' })
            }

            // Send successfully 
            return res.json({ data: product })
        }

        else {
            // IF CLIENT DOESN'T HAVE (client_id) COOKIE //
            const productId = req.body.id

            // Check params
            if (!productId) {
                return res.status(400).json({ message: 'Product ID is missing in the request body' })
            }

            // Set entrie
            const clientId = uuidv4()

            const client_favoriteProduct = {
                client_id: clientId,
                product_id: productId
            }

            // Create entrie
            await FavoriteProduct.create(client_favoriteProduct)

            // Get product
            const product = await Product.findOne({ where: { id: productId } })

            // Check product
            if (!product) {
                return res.status(404).json({ message: 'Favorite product not found' })
            }

            // Create & send cookie
            res.cookie(cookieName, clientId, { maxAge: 30 * 24 * 60 * 60 * 1000})

            // Send Successfully 
            return res.json({ data: product })
        } 
    }
    catch (err) {
        return res.status(500).json({ message: 'Database error !', error: err.message, stack: err.stack })
    }
}


// GET FAVORITES PRODUCTS //
exports.getFavoritesProducts = async (req, res) => {

    try {
        // CHECK IF CLIENT HAS (client_id) COOKIE
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
            // IF CLIENT DOESN'T HAVE (client_id) COOKIE
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