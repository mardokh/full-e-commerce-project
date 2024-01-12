// MODULES IMPORTATION //
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const shopping = require('./routes/shoppingCart')
const products = require('./routes/products')
const recipes = require('./routes/recipes')

// MODULES //
const shoppingCart = require('./models/shoppingCart')
const product = require('./models/product')
const recipe = require('./models/recipe')


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
app.use('/uploads', express.static('uploads'));


// ROUTES //
app.get('/', (req, res) => res.send('Welcom you are connected'))
app.use('/shopping', shopping)
app.use('/products', products)
app.use('/recipes', recipes)
app.get('*', (req, res) => res.status(404).send('404 not found !'))


// STARTING API SERVER AND DATABASE //
DB.authenticate()
  .then(() => {

    // database connected
    console.log('Database connected sucessfully')
    
    // tables associations
    shoppingCart.belongsTo(product, { foreignKey: 'product_id', onDelete: 'CASCADE' });
    product.hasMany(shoppingCart, { foreignKey: 'product_id', onDelete: 'SET NULL' });

    
    // synchronizate models
    shoppingCart.sync({ alter: true })
    product.sync({alter: true})
    recipe.sync({alter: true})
    
    // start server
    app.listen(8989, () => { 
      console.log('api server is starting')
    })
    
  })
  .catch(err => console.log('Error to database connect !', err))