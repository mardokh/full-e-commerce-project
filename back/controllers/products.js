// MODULES IMPORTS // 
const Product = require('../models/product')


// GET ALL PRODUCTS //
exports.getAllProducts = async (req, res) => {

    try {
        // get all products from table
        const products = await Product.findAll()

        // check if products exist
        if (products.length === 0) {
            return res.status(404).json({data: "vous n'avez ajouté aucun produit"})
        } 
        
        // send successfylly response
        return res.json({data: products})
        
    }
    catch(err) {
        return res.status(500).json({message: 'Database error !', error: err.message, stack: err.stack})
    }
}


// GET ONE PRODUCT //
exports.getOneProduct = async (req, res) => {

    try {
        // extract id from request
        const productId = parseInt(req.params.id)
        
        // check id validity
        if (!productId) {
            return res.status(400).json({message: 'Missing params !'})
        }

        // get product from database
        const product = await Product.findOne({where: {id: productId}})
        
        // check if product exist
        if (product === null) {
            return res.status(404).json({message: `This product do not exist !`})
        }

        // send successfylly response
        return res.json({data: product})
    }
    catch(err) {
        return res.status(500).json({message: 'Database error !', error: err.message, stack: err.stack})   
    }
}


// PUT PRODUCTS //
exports.putProduct = async (req, res) => {

    try {
        // body request destructuring
        const {name, details, price} = req.body

        // img path extract
        const imgPath = req.file.filename

        // set data inputs
        const inputs = {name: name, details: details, price: price, image: imgPath}


        // check inputs
        if (!name || !details || !price || !imgPath) {
            return res.status(400).json({message: 'Missing data input !'})
        }

        // check if product exist
        const product = await Product.findOne({where: {name:name}})

        if (product !== null) {
            return res.status(409).json({message: `this product : ${name} is already exist !`})
        }

        // create new product
        await Product.create(inputs)

        // send successfylly response
        return res.status(201).json({message: 'Product successfully creating'})

    }
    catch(err) {
        return res.status(500).json({message: 'Database error !', error: err.message, stack: err.stack})
    }
}


// UPDATE PRODUCTS //
exports.updateProduct = async (req, res) => {

    try {
        // extract id from request
        const productId = parseInt(req.params.id)

        // check id validity
        if (!productId) {
            return res.status(400).json({message: 'Missing params !'})
        }

        // check if product exist
        const product = await Product.findOne({where: {id: productId}})
        
        if (product === null) {
            return res.status(409).json({message: `this product do not exist !`})
        }

        // update product
        await Product.update(req.body, {where: {id: productId}})
        
        // send successfully response
        return res.json({message: 'Product updated successfully'})            
    }
    catch(err) {
        return res.status(500).json({message: 'Database error !', error: err.message, stack: err.stack})
    }
}


// TRASH PRODUCT  //
exports.trasProduct = async (req, res) => {

    try {
        // extract id from request
        const productId = parseInt(req.params.id)

        // check id validity
        if (!productId) {
            return res.status(400).json({message: 'Missing id params !'})
        }

        // check product exist
        const product = await Product.findOne({where: {id: productId}})

        if (product === null) {
            return res.status(409).json({message: 'This product do not exist !'})
        }

        // delete product
        await Product.destroy({where: {id: productId}})

        // send successfully reponse
        return res.json({message: 'Product successfully trash'})

    }
    catch(err) {
        return res.status(500).json({message: 'Database error !', error: err.message, stack: err.stack})
    }
}


//  UNTRASH PRODUCTS //
exports.untrashProduct = async (req, res) => {

    try {
        // extract id from request
        const productId = parseInt(req.params.id)

        // check id validity
        if (!productId) {
            return res.status(400).json({message: 'Missing id params !'})
        }

        // untrash product
        await Product.restore({where: {id: productId}})

        // send successfully response
        return res.json({message: 'product successfully untrash'})
    }
    catch(err) {
        return res.status(500).json({message: 'Database error !', error: err.message, stack: err.stack})
    }
}


// DELETE PRODUCTS  //
exports.deleteProduct = async (req, res) => { 

    try {
        // exctract id from request
        const productId = parseInt(req.params.id)

        // delete product
        await Product.destroy({where: {id: productId}, force: true})

        // send successfully response
        return res.json({message: 'Product successfully delete'}) 
    }
    catch(err) {
        return res.status(500).json({message: 'Database error !', error: err.message, stack: err.stack})
    }
}
