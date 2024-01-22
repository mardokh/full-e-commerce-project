import React, { useEffect, useRef } from "react"
import { favoriteRecipeService } from "../../_services/favoriteRecipe.service"



const FavoritesRecipes = () => {

    // STATES //
    //const [recipes, setRecipes] = useState([])
    //const [isLoad, setISload] = useState(false)
    
    // REFERENCE //
    const refUseEffect = useRef(false)


    // GET ALL RECIPES ADDS IN FAVORITES
    useEffect(() => {
        if (refUseEffect.current === false) {
            favoriteRecipeService.favoriteRecipeGetAll()
            .then(res => {
                console.log(res.data.data)
                //setISload(true)
            })
            .catch(err => console.error(err))
        }
        return () => refUseEffect.current = true
    }, [])


    // Loader //
    //if (!isLoad) {
    //    return <div>Loading...</div>
    //}


    return (
        <div>
            favorites recipes
        </div>
    )
}


export default FavoritesRecipes