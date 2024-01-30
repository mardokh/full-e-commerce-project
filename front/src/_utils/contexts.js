// MODULES IMPORTS //
import { createContext, useState } from 'react'


// CREATE CONTEXT //
const MyContext = createContext()

// MAIN FUNCTION //
export const MyProvider = ({ children }) => {

    // Favorites products count 
    const [favoritesProductsCount, setFavoritesProductsCount] = useState(0)

    // Favorites recipes count 
    const [favoritesRecipesCount, setFavoritesRecipesCount] = useState(0)

    // Products notes displaying
    const [productsNotesDisplay, setProducstNotesDisplay] = useState(false)

    // Products notes id
    const [productsNotesId, setProducstNotesId] = useState(false)

    const updateProductsNotesDisplay = (switchDisp) => {
        setProducstNotesDisplay(switchDisp)
    }

    const updateProductsNotesId = (productId) => {
        setProducstNotesId(productId)
    }

    const updateFavoritesProductsCount = (count) => {
        setFavoritesProductsCount(count)
    }

    const updateFavoritesRecipesCount = (count) => {
        setFavoritesRecipesCount(count)
    }

    return (
        <MyContext.Provider value={{
            favoritesProductsCount, 
            updateFavoritesProductsCount, 
            favoritesRecipesCount, 
            updateFavoritesRecipesCount,
            productsNotesDisplay,
            updateProductsNotesDisplay,
            productsNotesId,
            updateProductsNotesId
        }}>
        {children}
        </MyContext.Provider>
    )
}


// MODULES EXPORTS //
export default MyContext
