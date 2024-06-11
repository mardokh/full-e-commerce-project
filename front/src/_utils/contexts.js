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


    // Products on add
    const [productsOnAdd, setProductsOnAdd] = useState(false)

    const updateProductsOnAdd = (onAdd) => {
        setProductsOnAdd(onAdd)
    }


    // Products on edit
    const [productsOnEdit, setProductsOnEdit] = useState(false)

    const updateProductsOnEdit = (onEdit) => {
        setProductsOnEdit(onEdit)
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


    // Reviews displaying
    const [reviewsOnDisplay, setReviewsOnDisplay] = useState(false)

    const updateReviewsOnDisplay = (switchDisp) => {
        setReviewsOnDisplay(switchDisp)
    }


    // User have comment
    const [userHaveComment, setUserHaveComment] = useState(false)

    const updateUserHaveComment = (switchDisp) => {
        setUserHaveComment(switchDisp)
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

            // Products on add
            productsOnAdd,
            updateProductsOnAdd,

            // Products on edit
            productsOnEdit,
            updateProductsOnEdit,

            // Shopping cart count
            shoppingCartCount,
            updateShoppingCartCount,

            // Inscription sumbit switch
            sumbitSwitch,
            updateSumbitSwitch,

            // Corner account login
            accountLogin,
            updateAccountLogin,

            // Reviews displaying
            reviewsOnDisplay,
            updateReviewsOnDisplay,

            // User have comment
            userHaveComment,
            updateUserHaveComment,
        }}>
        {children}
        </MyContext.Provider>
    )
}


// MODULES EXPORTS //
export default MyContext
