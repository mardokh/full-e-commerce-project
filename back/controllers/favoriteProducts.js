// MODULES IMPORTS //
const { v4: uuidv4 } = require('uuid')
const FavoriteProduct = require('../models/favoriteProduct')
const Product = require('../models/product')
//const {Sequelize} = require('sequelize')

// GLOBALS VARIABLS //
const cookieName = 'client_id'

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
            res.cookie('client_id', clientId, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

            // Send Successfully 
            return res.json({ data: product })
        } 
    }
    catch (err) {
        return res.status(500).json({ message: 'Database error from Favorite product !', error: err.message, stack: err.stack })
    }
}