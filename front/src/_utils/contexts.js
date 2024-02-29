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
    const [productsNotesId, setProducstNotesId] = useState(false)

    const updateProductsNotesId = (productId) => {
        setProducstNotesId(productId)
    }


    // Recipes notes displaying
    const [recipesNotesDisplay, setRecipestNotesDisplay] = useState(false)

    const updateRecipesNotesDisplay = (switchDisp) => {
        setRecipestNotesDisplay(switchDisp)
    }


    // Recipes notes id
    const [recipesNotesId, setRecipesNotesId] = useState(false)

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


    // Recipes add displaying
    const [recipesAddDisplay, setRecipesAddDisplay] = useState(false)

    const updateRecipesAddDisplay = (switchDisp) => {
        setRecipesAddDisplay(switchDisp)
    }


    // Products on add
    const [productsOnAdd, setProductsOnAdd] = useState(false)

    const updateProductsOnAdd = (onAdd) => {
        setProductsOnAdd(onAdd)
    }


    // Recipes on add
    const [recipesOnadd, setRecipesOnadd] = useState(false)

    const updateRecipesOnAdd = (onAdd) => {
        setRecipesOnadd(onAdd)
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
            updateRecipesOnAdd
        }}>
        {children}
        </MyContext.Provider>
    )
}


// MODULES EXPORTS //
export default MyContext
