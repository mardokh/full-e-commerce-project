// MODULES IMPORTS // 
const DB = require('../db.config')
const Product = DB.product
const productImages = DB.productImages
const fs = require('fs')
const path = require('path')



// GET ALL PRODUCTS //
exports.getAllProducts = async (req, res) => {

    try {
        // Get all products from database
        const products = await Product.findAll()

        // Check if some products exists
        if (products.length === 0) {
            return res.status(404).json({data: "section vide"})
        } 
        
        // Send successfylly response
        return res.json({data: products})
    }
    catch(err) {
        return res.status(500).json({message: 'Database error !', error: err.message, stack: err.stack})
    }
}


// GET ONE PRODUCT //
exports.getOneProduct = async (req, res) => {

    try {
        // Extract product id from request
        const productId = parseInt(req.params.id)
        
        // Check product id validity
        if (!productId) {
            return res.status(400).json({message: 'Missing id params getOneProduct !'})
        }

        // Get product from database
        const product = await Product.findOne({where: {id: productId}, 
            include: [{model: productImages, attributes: ['images'], as: 'product_images'}]})
        
        // Check if product exist
        if (product === null) {
            return res.status(404).json({message: 'This product do not exist !'})
        }

        // Send successfylly response
        return res.json({data: product})
    }
    catch(err) {
        return res.status(500).json({message: 'Database error !', error: err.message, stack: err.stack})   
    }
}


// PUT PRODUCT //
exports.putProduct = async (req, res) => {

    try {
        // Body request destructuring
        const {name, details, price} = req.body

        // Img product path extract
        const image = req.files.image[0].filename

        // Imgs product path extract
        const images = req.files['images']

        // Check product inputs
        if (!name || !details || !price || !image || !images) {
            return res.status(400).json({message: 'Missing data input !'})
        }

        // Set product inputs
        const inputs = {name: name, details: details, price: price, image: image}

        // Check if product exist
        const product = await Product.findOne({where: {name:name}})

        if (product !== null) {
            return res.status(409).json({message: `this product : ${name} is already exist !`})
        }

        // Create product
        const createProduct = await Product.create(inputs)

        // Input product images
        images.map(async file => {
            await productImages.create({productId: createProduct.id, images: file.filename})
        })

        // Send successfylly response
        return res.status(201).json({message: 'Product successfully creating'})

    }
    catch(err) {
        return res.status(500).json({message: 'Database error !', error: err.message, stack: err.stack})
    }
}


// UPDATE PRODUCT //
exports.updateProduct = async (req, res) => {

    try {
        // Body request destructuring
        const {id, name, details, price, image} = req.body

        // Check product id validity
        if (!id) {
            return res.status(400).json({message: 'Missing id params updateProduct!'})
        }

        // Get product from database
        const product = await Product.findOne({where: {id: id}})

        // Check if product exist
        if (product === null) {
            return res.status(404).json({message: 'This product do not exist !'})
        }

        // Set image product input
        let newImage = image
        if (req.file && req.file.filename) {
            newImage = req.file.filename
        }

       // Set product inputs
       const updateProduct = {
        name,
        details,
        price,
        image: newImage,
       }

       // Update product from database
       await Product.update(updateProduct, {where: {id: id}})

       // Get the image filename associated
       const imageFilename = product.image

       // Delete the associated image file
       if (imageFilename !== image) {
            fs.unlinkSync(path.join(__dirname, '..', 'uploads', imageFilename))
       }

       // Send successfully response
       return res.json({message: 'Product updated successfully'})
    }
    catch (err) {
        return res.status(500).json({message: 'Database error !', error: err.message, stack: err.stack})
    }
}


// TRASH PRODUCT  //
exports.trasProduct = async (req, res) => {

    try {
        // Extract product id from request
        const productId = parseInt(req.params.id)

        // Check product id validity
        if (!productId) {
            return res.status(400).json({message: 'Missing id params trasProduct!'})
        }

        // Get product from database
        const product = await Product.findOne({where: {id: productId}})

        // Check if product exist
        if (product === null) {
            return res.status(409).json({message: 'This product do not exist !'})
        }

        // Delete product from database
        await Product.destroy({where: {id: productId}})

        // Send successfully reponse
        return res.json({message: 'Product successfully trash'})

    }
    catch(err) {
        return res.status(500).json({message: 'Database error !', error: err.message, stack: err.stack})
    }
}


// UNTRASH PRODUCT //
exports.untrashProduct = async (req, res) => {

    try {
        // Extract product id from request
        const productId = parseInt(req.params.id)

        // Check product id validity
        if (!productId) {
            return res.status(400).json({message: 'Missing id params untrashProduct!'})
        }

        // Untrash product from database
        await Product.restore({where: {id: productId}})

        // Send successfully response
        return res.json({message: 'product successfully untrash'})
    }
    catch(err) {
        return res.status(500).json({message: 'Database error !', error: err.message, stack: err.stack})
    }
}


// DELETE PRODUCT //
exports.deleteProduct = async (req, res) => {

    try {
        // Extract product id from request
        const productId = parseInt(req.params.id)

        // Get product from database 
        const product = await Product.findOne({ where: { id: productId } })

        // Check if product exist or not
        if (product === null) {
            return res.status(404).json({ message: 'Product not found !' })
        }

        // Delete product
        await Product.destroy({ where: { id: productId }, force: true })

        // Get the image filename associated
        const imageFilename = product.image

        // Delete the associated image file
        fs.unlinkSync(path.join(__dirname, '..', 'uploads', imageFilename))
            
        // Send successfully response
        return res.json({ message: 'Product successfully deleted' })
    }
    catch (err) {
        return res.status(500).json({ message: 'Database error !', error: err.message, stack: err.stack })
    }
}