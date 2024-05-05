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
const productNotes = require('./routes/productNotes')
const recipeNotes = require('./routes/recipeNotes')
const Admin = require('./routes/admin')
const User = require('./routes/user')
const searchBar = require('./routes/searchBar')
const jwtSession = require('./routes/check_jwt_session')


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
app.use('/products/notes', productNotes)
app.use('/recipes/notes', recipeNotes)
app.use('/search', searchBar)
app.use('/admin', Admin)
app.use('/user', User)
app.use('/session', jwtSession)
app.get('*', (req, res) => res.status(404).send('404 not found !'))


// STARTING API SERVER AND DATABASE //
DB.sequelize.authenticate()
.then(() => console.log('Database connected sucessfully'))
.then(() => {
  app.listen(8989, () => { 
    console.log('api server is starting')
  })
})
.catch(err => console.log('Error to database connect !', err))