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
            updateRecipesNotesId
        }}>
        {children}
        </MyContext.Provider>
    )
}


// MODULES EXPORTS //
export default MyContext
