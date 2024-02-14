// MODULES IMPORTS //
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')


// LOGIN ADMIN //
exports.login = async (req, res) => {

    try {
        // Get data from body request 
        const {identifiant, password} = req.body

        // Check data inputs
        if (!identifiant || !password) {
            return res.status(400).json({message: 'Missing inputs !'})
        }

        // Fetch admin from database
        const admin = await Admin.findOne({where: {identifiant: identifiant}})

        // Check if admin exist
        if (admin === null) {
            return res.status(401).json({message: 'Mot de passe ou identifiant incorrect !'})
        }

        // Check password from database
        const passe = await bcrypt.compare(password, admin.password)

        // Check if password
        if (!passe) {
            return res.status(401).json({message: 'Mot de passe ou identifiant incorrect !'})
        }

        // Generate json web token
        const token = jwt.sign({
            id: admin.id,
            identifiant: admin.identifiant
        }, process.env.JWT_SECRET, {expiresIn: "24h"})

        // Send token 
        return res.json({access_token : token})
        
    }
    catch (err) {
        return res.status(500).json({message: 'Database error !', error: err.message, stack: err.stack})
    }
}