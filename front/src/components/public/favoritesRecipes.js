import React, { useEffect, useRef, useState } from "react"
import { favoriteRecipeService } from "../../_services/favoriteRecipe.service"
import "./favorites_recipes.css"


const FavoritesRecipes = () => {

    // STATES //
    const [recipes, setRecipes] = useState([])
    const [isLoad, setISload] = useState(false)
    

    // REFERENCE //
    const refUseEffect = useRef(false)
    const refRecipes = useRef(false)


    // GET ALL RECIPES ADDS IN FAVORITES
    useEffect(() => {
        if (refUseEffect.current === false) {
            favoriteRecipeService.favoriteRecipeGetAll()
            .then(res => {
                if (res.data.data && res.data.data[0] && res.data.data[0].favorite_recipe) {      
                    refRecipes.current = true
                }
                setRecipes(res.data.data)
                setISload(true)
            })
            .catch(err => console.error(err))
        }
        return () => refUseEffect.current = true
    }, [])


    // DELETE FAVORITE //
    const deleteFavoriteRecipe = async (recipeId) => {

        try {
            // Api call for delete favorite recipe
            await favoriteRecipeService.favoriteRecipeDelete(recipeId)

            // APi call for get favorites recipes
            const favoriteRecipe = await favoriteRecipeService.favoriteRecipeGetAll()

            // Update state
            setRecipes(favoriteRecipe.data.data)

            if (favoriteRecipe.data.data && favoriteRecipe.data.data[0] && !favoriteRecipe.data.data[0].favorite_recipe) {      
                refRecipes.current = false
            }
        }
        catch (err) {
            console.error(err)
        }
    }


    // Loader //
    if (!isLoad) {
        return <div>Loading...</div>
    }


    return (
        <div className="favorites_Recipes_main_container">
            {refRecipes.current ?
                recipes.map(recipe => (
                    <div key={recipe.favorite_recipe.id} className="favorites_Recipes_container">
                        <div className="favorites_Recipes_name favorites_Recipes_items">
                            <p>{recipe.favorite_recipe.name}</p>
                        </div>
                        <div>
                            <i onClick={() => deleteFavoriteRecipe(recipe.favorite_recipe.id)} class="fa-solid fa-trash"></i>
                        </div>
                    </div>  
                )) : (<div>{recipes}</div>)
            }
        </div>
    )
}


export default FavoritesRecipes