// MODULES IMPORTS //
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')


// ROUTES IMPORTS //
const shopping = require('./routes/shoppingCart')
const products = require('./routes/products')
const recipes = require('./routes/recipes')
const favoritesProducts = require('./routes/favoriteProducts')
const favoritesRecipes = require('./routes/favoriteRecipes')


// MODELS IMPORTS //
const shoppingCart = require('./models/shoppingCart')
const product = require('./models/product')
const recipe = require('./models/recipe')
const favoriteProduct = require('./models/favoriteProduct')
const favoriteRecipe = require('./models/favoriteRecipe')


// IMPORT DATABASE CONNECTER //
const DB = require('./db.config')


// EXPRESS SERVER INITIALISATION //
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


// CORS POLICY //
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


// STATICS FILES //
app.use('/uploads', express.static('uploads'))


// ROUTES //
app.get('/', (req, res) => res.send('Welcom you are connected'))
app.use('/shopping', shopping)
app.use('/products', products)
app.use('/recipes', recipes)
app.use('/favorites/products', favoritesProducts)
app.use('/favorites/recipes', favoritesRecipes)
app.get('*', (req, res) => res.status(404).send('404 not found !'))


// STARTING API SERVER AND DATABASE //
DB.authenticate()
  .then(() => {

    // database connected
    console.log('Database connected sucessfully')

    // tables associations : shoppingCarts to products - products to shoppingCarts
    shoppingCart.belongsTo(product, { foreignKey: 'product_id', as: 'shopping_cart_product', onDelete: 'CASCADE' })
    product.hasMany(shoppingCart, { foreignKey: 'product_id', onDelete: 'SET NULL' })

    // tables associations : favoriteProducts to products - products to favoriteProducts
    favoriteProduct.belongsTo(product, { foreignKey: 'product_id', as: 'favorite_product', onDelete: 'CASCADE' })
    product.hasOne(favoriteProduct, { foreignKey: 'product_id', onDelete: 'SET NULL' })

    // tables associations : favoriteRecipes to recipes - recipes to favoriteRecipes
    favoriteRecipe.belongsTo(recipe, { foreignKey: 'recipe_id', as: 'favorite_recipe', onDelete: 'CASCADE' })
    recipe.hasOne(favoriteRecipe, { foreignKey: 'recipe_id', onDelete: 'SET NULL' })

    // synchronizate models
    product.sync({alter: true})
    shoppingCart.sync({ alter: true })
    favoriteProduct.sync({alter: true})
    recipe.sync({alter: true})
    favoriteRecipe.sync({alter: true})
    
    // start server
    app.listen(8989, () => { 
      console.log('api server is starting')
    })
    
  })
  .catch(err => console.log('Error to database connect !', err))