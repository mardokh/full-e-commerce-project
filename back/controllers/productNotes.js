// MODULES IMPORTS //
const ProductNote = require('../models/productNote')
const Product = require('../models/product')
const sequelize = require('../db.config')


// ADD PRODUCT NOTE //
exports.addProductNote = async (req, res) => {

    try {
        // Body request destructuring
        const {id, email, note} = req.body

        // Check inputs
        if (!id || !email || !note) {
            return res.status(400).json({message: "Missing inputs !"})
        }

        // Find product from database
        const product = await Product.findOne({where: {id: id}})

        // Check if product exist
        if (product === null) {
            return res.status(404).json({message: "This product do not exist !"})
        }

        // Create note
        await ProductNote.create({
            product_id: id,
            email: email,
            note: note
        })

        // Calculate notes and insert into products table
        const result = await ProductNote.findAll({
            attributes: [
              'product_id',
              [sequelize.fn('SUM', sequelize.literal('CASE WHEN `note` = 1 THEN 1 ELSE 0 END')), 'note_count_for_1'],
              [sequelize.fn('SUM', sequelize.literal('CASE WHEN `note` = 2 THEN 1 ELSE 0 END')), 'note_count_for_2'],
              [sequelize.fn('SUM', sequelize.literal('CASE WHEN `note` = 3 THEN 1 ELSE 0 END')), 'note_count_for_3'],
              [sequelize.fn('SUM', sequelize.literal('CASE WHEN `note` = 4 THEN 1 ELSE 0 END')), 'note_count_for_4'],
              [sequelize.fn('SUM', sequelize.literal('CASE WHEN `note` = 5 THEN 1 ELSE 0 END')), 'note_count_for_5'],
            ],
            where: {},
            group: ['product_id'],
          })
    
          const noteResult = result.map(async (row) => {
            const total_notes =
               (1 * row.dataValues.note_count_for_1 +
                2 * row.dataValues.note_count_for_2 +
                3 * row.dataValues.note_count_for_3 +
                4 * row.dataValues.note_count_for_4 +
                5 * row.dataValues.note_count_for_5) /
        
               (Number(row.dataValues.note_count_for_1) +
                Number(row.dataValues.note_count_for_2) +
                Number(row.dataValues.note_count_for_3) +
                Number(row.dataValues.note_count_for_4) +
                Number(row.dataValues.note_count_for_5))
        
            // Update product note in the products table
            await Product.update({ note: total_notes }, { where: { id: row.product_id } })
        
            return {
                product_id: row.product_id,
                total_notes: total_notes,
            }
        })
        
        // Wait for all the updates to complete
        await Promise.all(noteResult)
        
        return res.json({ message: 'success' })
        
    }
    catch (err) {
        return res.status(500).json({ message: 'Database error !', error: err.message, stack: err.stack })
    }
}