// MODULES IMPORTS //
import { createContext, useState } from 'react'


// CREATE CONTEXT //
const MyContext = createContext()

// MAIN FUNCTION //
export const MyProvider = ({ children }) => {


    // Favorites products count
    const [favoritesProductsCount, setFavoritesProductsCount] = useState(0)

    const updateFavoritesProductsCount = (count) => {
        setFavoritesProductsCount(count)
    }


    // Favorites recipes count 
    const [favoritesRecipesCount, setFavoritesRecipesCount] = useState(0)

    const updateFavoritesRecipesCount = (count) => {
        setFavoritesRecipesCount(count)
    }


    // Products notes displaying
    const [productsNotesDisplay, setProducstNotesDisplay] = useState(false)

    const updateProductsNotesDisplay = (switchDisp) => {
        setProducstNotesDisplay(switchDisp)
    }


    // Products notes id
    const [productsNotesId, setProducstNotesId] = useState(null)

    const updateProductsNotesId = (productId) => {
        setProducstNotesId(productId)
    }


    // Recipes notes displaying
    const [recipesNotesDisplay, setRecipestNotesDisplay] = useState(false)

    const updateRecipesNotesDisplay = (switchDisp) => {
        setRecipestNotesDisplay(switchDisp)
    }


    // Recipes notes id
    const [recipesNotesId, setRecipesNotesId] = useState(null)

    const updateRecipesNotesId = (recipeId) => {
        setRecipesNotesId(recipeId)
    }


    // Session token
    const [sessionToken, setSessionToken] = useState(false)

    const updateSessionToken = (token) => {
        setSessionToken(token)
    }


    // Products add displaying
    const [productsAddDisplay, setProductsAddDisplay] = useState(false)

    const updateProductsAddDisplay = (switchDisp) => {
        setProductsAddDisplay(switchDisp)
    }


    // Products edit displaying
    const [productsEditDisplay, setProductsEditDisplay] = useState(false)

    const updateProductsEditDisplay = (switchDisp) => {
        setProductsEditDisplay(switchDisp)
    }


    // Products on add
    const [productsOnAdd, setProductsOnAdd] = useState(false)

    const updateProductsOnAdd = (onAdd) => {
        setProductsOnAdd(onAdd)
    }


    // Products edit id
    const [productsEditId, setProductsEditId] = useState(null)

    const updateProductsEditId = (productId) => {
        setProductsEditId(productId)
    }


    // Products on edit
    const [productsOnEdit, setProductsOnEdit] = useState(false)

    const updateProductsOnEdit = (onEdit) => {
        setProductsOnEdit(onEdit)
    }


    // Recipes add displaying
    const [recipesAddDisplay, setRecipesAddDisplay] = useState(false)

    const updateRecipesAddDisplay = (switchDisp) => {
        setRecipesAddDisplay(switchDisp)
    }


    // Recipes on add
    const [recipesOnadd, setRecipesOnadd] = useState(false)

    const updateRecipesOnAdd = (onAdd) => {
        setRecipesOnadd(onAdd)
    }


    // Recipes edit displaying
    const [recipesEditDisplay, setRecipesEditDisplay] = useState(false)

    const updateRecipesEditDisplay = (switchDisp) => {
        setRecipesEditDisplay(switchDisp)
    }


    // Recipe edit id
    const [recipesEditId, setRecipesEditId] = useState(null)

    const updateRecipesEditId = (recipeId) => {
        setRecipesEditId(recipeId)
    }


    // Recipe on edit
    const [recipesOnEdit, setRecipesOnEdit] = useState(false)

    const updateRecipesOnEdit = (onEdit) => {
        setRecipesOnEdit(onEdit)
    }


    // Shopping cart count
    const [shoppingCartCount, setShoppingCartCount] = useState(0)

    const updateShoppingCartCount = (count) => {
        setShoppingCartCount(count)
    }


    // Inscription sumbit switch
    const [sumbitSwitch, setSumbitSwitch] = useState(false)

    const updateSumbitSwitch = (switchSub) => {
        setSumbitSwitch(switchSub)
    }


    // Corner account login
    const [accountLogin, setAccountLogin] = useState(false)

    const updateAccountLogin = (login) => {
        setAccountLogin(login)
    }


    return (
        <MyContext.Provider value={{

            // Favorites products count
            favoritesProductsCount, 
            updateFavoritesProductsCount,

            // Favorites recipes count
            favoritesRecipesCount, 
            updateFavoritesRecipesCount,

            // Products notes displaying
            productsNotesDisplay,
            updateProductsNotesDisplay,

            // Products notes id
            productsNotesId,
            updateProductsNotesId,

            // Recipes notes displaying
            recipesNotesDisplay,
            updateRecipesNotesDisplay,

            // Recipes notes id
            recipesNotesId,
            updateRecipesNotesId,

            // Session token
            sessionToken,
            updateSessionToken,

            // Products add displaying
            productsAddDisplay,
            updateProductsAddDisplay,

            // Recipes add displaying
            recipesAddDisplay,
            updateRecipesAddDisplay,

            // Products on add
            productsOnAdd,
            updateProductsOnAdd,

            // Recipes on add
            recipesOnadd,
            updateRecipesOnAdd,

            // Products edit displaying
            productsEditDisplay,
            updateProductsEditDisplay,

            // Recipes edit displaying
            recipesEditDisplay,
            updateRecipesEditDisplay,

            // Products edit id
            productsEditId,
            updateProductsEditId,

            // Products on edit
            productsOnEdit,
            updateProductsOnEdit,

            // Recipes edit id
            recipesEditId,
            updateRecipesEditId,

            // Recipes on edit
            recipesOnEdit,
            updateRecipesOnEdit,

            // Shopping cart count
            shoppingCartCount,
            updateShoppingCartCount,

            // Inscription sumbit switch
            sumbitSwitch,
            updateSumbitSwitch,

            // Corner account login
            accountLogin,
            updateAccountLogin,
        }}>
        {children}
        </MyContext.Provider>
    )
}


// MODULES EXPORTS //
export default MyContext
