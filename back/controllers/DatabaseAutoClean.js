// MODULES IMPORTS //
const FavoriteProduct = require('../models/favoriteProduct')
const FavoriteRecipe = require('../models/favoriteRecipe')
const { Op } = require('sequelize')
const cron = require('node-cron')


// AUTO DELETE FROM (favoriteProducts) TABLE //
cron.schedule('0 0 * * *', async () => {
    try {
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

        // Delete entries older than one week
        await FavoriteProduct.destroy({
            where: {
                createdAt: {
                    [Op.lt]: oneWeekAgo
                }
            }
        })
    } catch (error) {
        console.error('Error in scheduled task:', error)
    }
})

// AUTO DELETE FROM (favoriteRecipes) TABLE //
cron.schedule('0 0 * * *', async () => {
    try {
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

        // Delete entries older than one week
        await FavoriteRecipe.destroy({
            where: {
                createdAt: {
                    [Op.lt]: oneWeekAgo
                }
            }
        })
    } catch (error) {
        console.error('Error in scheduled task:', error)
    }
})