// MODULES IMPORTS //
const RecipeNote = require('../models/recipeNotes')
const Recipe = require('../models/recipe')
const sequelize = require('../db.config')
const { v4: uuidv4 } = require('uuid')


// GLOBALS VARIABLS //
const cookieName = 'client_id_recipes_notes'


// ADD RECIPE NOTE //
exports.addRecipeNote = async (req, res) => {

    try {
        // IF CLIENT HAS COOKIE WITH SPECIFIED COOKIENAME //
        if (req.cookies && req.cookies[cookieName]) {

            // Extract client id
            const client_id = req.cookies[cookieName]

            // Extract recipe id & note
            const {id, note} = req.body

            // Check inputs 
            if (!id || !note) {
                return res.status(400).json({message: 'Missing inputs !'})
            }

            // check if the client has already rated this recipe
            const recipeNoted = await RecipeNote.findAll({where: {client_id: client_id, recipe_id: id}})

            if (recipeNoted.length !== 0) {
                await RecipeNote.update({ note: req.body.note }, { where: {client_id: client_id, recipe_id: id}})
            }
            else {
                // Create recipe note
                await RecipeNote.create({
                client_id: client_id,
                recipe_id: id,
                note: note
                })
            }

            // Calculate notes and insert into recipes table
            const result = await RecipeNote.findAll({
                attributes: [
                    'recipe_id',
                    [sequelize.fn('SUM', sequelize.literal('CASE WHEN `note` = 1 THEN 1 ELSE 0 END')), 'note_count_for_1'],
                    [sequelize.fn('SUM', sequelize.literal('CASE WHEN `note` = 2 THEN 1 ELSE 0 END')), 'note_count_for_2'],
                    [sequelize.fn('SUM', sequelize.literal('CASE WHEN `note` = 3 THEN 1 ELSE 0 END')), 'note_count_for_3'],
                    [sequelize.fn('SUM', sequelize.literal('CASE WHEN `note` = 4 THEN 1 ELSE 0 END')), 'note_count_for_4'],
                    [sequelize.fn('SUM', sequelize.literal('CASE WHEN `note` = 5 THEN 1 ELSE 0 END')), 'note_count_for_5'],
                ],
                where: {},
                group: ['recipe_id'],
                })

                const noteResult = result.map(async (row) => {
                const total_notes =
                  ( 1 * row.dataValues.note_count_for_1 +
                    2 * row.dataValues.note_count_for_2 +
                    3 * row.dataValues.note_count_for_3 +
                    4 * row.dataValues.note_count_for_4 +
                    5 * row.dataValues.note_count_for_5 ) /
            
                  ( Number(row.dataValues.note_count_for_1) +
                    Number(row.dataValues.note_count_for_2) +
                    Number(row.dataValues.note_count_for_3) +
                    Number(row.dataValues.note_count_for_4) +
                    Number(row.dataValues.note_count_for_5) )
            
                // Update recipe note in the recipes table
                await Recipe.update({ note: total_notes }, { where: { id: row.recipe_id } })
            
                return {
                    recipe_id: row.recipe_id,
                    total_notes: total_notes,
                }
            })
            
            // Wait for all the updates to complete
            await Promise.all(noteResult)

            // Send successfully
            return res.json({ data: 'success' })
        }
        else {
            // IF CLIENT DOESN'T HAVE COOKIE WITH SPECIFIED COOKIENAME //
            const {id, note} = req.body

            // Check inputs 
            if (!id || !note) {
                return res.status(400).json({message: 'Missing inputs !'})
            }

            // Create clien id
            const clientId = uuidv4()

            // Create recipe note
            await RecipeNote.create({
                client_id: clientId,
                recipe_id: id,
                note: note
            })

            // Calculate notes and insert into recipes table
            const result = await RecipeNote.findAll({
                attributes: [
                    'recipe_id',
                    [sequelize.fn('SUM', sequelize.literal('CASE WHEN `note` = 1 THEN 1 ELSE 0 END')), 'note_count_for_1'],
                    [sequelize.fn('SUM', sequelize.literal('CASE WHEN `note` = 2 THEN 1 ELSE 0 END')), 'note_count_for_2'],
                    [sequelize.fn('SUM', sequelize.literal('CASE WHEN `note` = 3 THEN 1 ELSE 0 END')), 'note_count_for_3'],
                    [sequelize.fn('SUM', sequelize.literal('CASE WHEN `note` = 4 THEN 1 ELSE 0 END')), 'note_count_for_4'],
                    [sequelize.fn('SUM', sequelize.literal('CASE WHEN `note` = 5 THEN 1 ELSE 0 END')), 'note_count_for_5'],
                ],
                where: {},
                group: ['recipe_id'],
                })

                const noteResult = result.map(async (row) => {
                const total_notes =
                  ( 1 * row.dataValues.note_count_for_1 +
                    2 * row.dataValues.note_count_for_2 +
                    3 * row.dataValues.note_count_for_3 +
                    4 * row.dataValues.note_count_for_4 +
                    5 * row.dataValues.note_count_for_5 ) /
            
                  ( Number(row.dataValues.note_count_for_1) +
                    Number(row.dataValues.note_count_for_2) +
                    Number(row.dataValues.note_count_for_3) +
                    Number(row.dataValues.note_count_for_4) +
                    Number(row.dataValues.note_count_for_5) )
            
                // Update recipe note in the recipes table
                await Recipe.update({ note: total_notes }, { where: { id: row.recipe_id } })
            
                return {
                    recipe_id: row.recipe_id,
                    total_notes: total_notes,
                }
            })
            
            // Wait for all the updates to complete
            await Promise.all(noteResult)

            // Create & send cookie
            res.cookie(cookieName, clientId, { maxAge: 30 * 24 * 60 * 60 * 1000})

            // Send successfully
            return res.json({ data: 'success' })
        }
    }
    catch (err) {
        return res.status(500).json({ message: 'Database error !', error: err.message, stack: err.stack })
    }
}