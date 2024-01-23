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

    const updateFavoritesProductsCount = (count) => {
        setFavoritesProductsCount(count)
    }

    const updateFavoritesRecipesCount = (count) => {
        setFavoritesRecipesCount(count)
    }

    return (
        <MyContext.Provider value={{ favoritesProductsCount, updateFavoritesProductsCount, favoritesRecipesCount, updateFavoritesRecipesCount }}>
        {children}
        </MyContext.Provider>
    )
}


// MODULES EXPORTS //
export default MyContext
