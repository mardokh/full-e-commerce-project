// MODULES IMPORTS //
const bcrypt = require('bcrypt')
const Admin = require('../models/admin')


// CREATE ADMIN //
exports.createAdmin = async (req, res) => {

    try {
        // Get data from body request 
        const {identifiant, password} = req.body

        // Check data inputs
        if (!identifiant || !password) {
            return res.status(400).json({message: 'Missing inputs !'})
        }

        // Fetch admin into table
        const admin = await Admin.findOne({where: {identifiant: identifiant}})

        // Check if admin exist
        if (admin !== null) {
            return res.status(409).json({message: `This user ${identifiant} already exist`})
        }

        // Password hash
        const hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT))
        
        // Update password whit hash
        req.body.password = hash

        // Create admin
        await Admin.create(req.body)

        // Send successfully
        return res.json({message: 'Admin created succesfully'})

    }
    catch (err) {
        return res.status(500).json({ message: 'Database error !', error: err.message, stack: err.stack })
    }
}