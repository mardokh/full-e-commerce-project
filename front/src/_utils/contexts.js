// MODULES IMPORTS //
import { createContext, useState } from 'react'


// CREATE CONTEXT //
const MyContext = createContext()

// MAIN FUNCTION //
export const MyProvider = ({ children }) => {

    // Favorites products count 
    const [favoriteCount, setFavoriteCount] = useState(0)

    const updateFavoriteCount = (count) => {
        setFavoriteCount(count)
    }

    return (
        <MyContext.Provider value={{ favoriteCount, updateFavoriteCount }}>
        {children}
        </MyContext.Provider>
    )
}


// MODULES EXPORTS //
export default MyContext;
