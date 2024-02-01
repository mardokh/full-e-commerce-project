import React, { useEffect, useState, useRef, useContext } from "react"
import './recettes.css'
import { recipeService } from '../../_services/recipe.service'
import { favoriteRecipeService } from '../../_services/favoriteRecipe.service'
import { Link } from "react-router-dom"
import Cookies from 'js-cookie'
import MyContext from '../../_utils/contexts'

const Recettes = () => {

    // STATES //
    const [recipes, setRecipes] = useState([])
    const [isLoad, setISload] = useState(false)
    const [refNotfound, setRefNotfound] = useState(false)
    const { updateFavoritesRecipesCount } = useContext(MyContext)
    const { updateRecipesNotesDisplay } = useContext(MyContext)
    const { updateRecipesNotesId } = useContext(MyContext)


    // REFERENCES //
    const flag = useRef(false)


    // Handle errors
    const handleError = (err) => {
        if (err.response && err.response.status) {
            setRefNotfound(true)
            setRecipes(err.response.data.data)
            setISload(true)
        } else {
            console.log('Error:', err.message)
        }
    }


    const getRecipes = async () => {

        try {
            // Get all recipes 
            const RecipesResponse = await recipeService.getAllRecipes()

            const recipesData = RecipesResponse.data.data

            // Get cookie from browser
            const isFavoritesCookieExists = Cookies.get('client_id_favorites_recipes')

            // If cookie exist
            if (isFavoritesCookieExists) {

                // Get all favotes recipes
                const favoritesRecipes = await favoriteRecipeService.favoriteRecipeGetAll()

                if (favoritesRecipes.data.data === "aucune recette favorite") {

                    //Update state
                    setRecipes(recipesData)

                    // Update loader 
                    setISload(true)
                }
                else {
                    // Get favorite produt id from favoritesRecipes table
                    const favoriteIds = favoritesRecipes.data.data.map(favorite => favorite.recipe_id)

                    // Update state
                    setRecipes(recipesData.map(recipe => ({
                        id: recipe.id,
                        name: recipe.name,
                        note: recipe.note,
                        image: recipe.image,
                        favorite: favoriteIds.includes(recipe.id) ? true : false
                    })))

                    // Update loader 
                    setISload(true)
                }
            }
            else {
                //Update state
                setRecipes(recipesData)

                // Update loader 
                setISload(true)
            }
        }
        catch (err) {
            handleError(err)
        }
    }


    // API CALL FOR GET RECIPES //
    useEffect(() => {

        if (flag.current === false) {
            getRecipes()
        }
        return () => flag.current = true
    }, [])


    // ADD RECIPE TO FAVORITES //
    const addTofavorite = async (recipeId, event) => {
        try {
            // Get css style of icon 
            const heartIcon = event.currentTarget
            const computedStyle = window.getComputedStyle(heartIcon)
            const color = computedStyle.color
    
            if (color === 'rgba(0, 128, 0, 0.45)') {
                
                // Api call for add favorite recipe
                const favorites_recipes_add = await favoriteRecipeService.favoriteRecipeAdd({ id: recipeId })

                // Update state context
                updateFavoritesRecipesCount(favorites_recipes_add.data.data.length)

                // Change icon color
                heartIcon.style.color = 'gold'
            } else {
                // Api call for delete favorite recipe
                await favoriteRecipeService.favoriteRecipeDelete(recipeId)

                // Api call for get all favorites recipes
                const favorites_recipes_del = await favoriteRecipeService.favoriteRecipeCount()

                // Update state context
                updateFavoritesRecipesCount(favorites_recipes_del.data.data.length)

                // Change icon color
                heartIcon.style.color = 'rgba(0, 128, 0, 0.45)'
            }
        } catch (err) {
            console.error(err)
        }
    }


    const displayNotesForm = (recipeId) => {
        updateRecipesNotesDisplay(true)
        updateRecipesNotesId(recipeId)
    }


    // Loader //
    if (!isLoad) {
        return <div>Loading...</div>
    }


    return (
        <div className="recipe_global_container">
            {!refNotfound ?
            recipes.map(recipe => (
                <div key={recipe.id} className='pics_container_sub'>
                    <div className='pics_englob'>
                    <Link to={`/recette_details/${recipe.id}`}><div className='pics_container' style={{backgroundImage: `url('http://localhost:8989/uploads/${recipe.image}')`}}></div></Link>
                        <div className='info_container'>
                            <p className='recette_name'>{recipe.name}</p>
                            <div className="recettes_interactions">
                                <div className="recettes_note">
                                    <Link onClick={() => displayNotesForm(recipe.id)}>
                                        <i className="fa-solid fa-star" style={{ color: recipe.note >= 1 ? 'gold' : '' }}></i>
                                        <i className="fa-solid fa-star" style={{ color: recipe.note >= 2 ? 'gold' : '' }}></i>
                                        <i className="fa-solid fa-star" style={{ color: recipe.note >= 3 ? 'gold' : '' }}></i>
                                        <i className="fa-solid fa-star" style={{ color: recipe.note >= 4 ? 'gold' : '' }}></i>
                                        <i className="fa-solid fa-star" style={{ color: recipe.note >= 5 ? 'gold' : '' }}></i>
                                    </Link>
                                </div>
                                <Link><i class={`fa-solid fa-bookmark ${recipe.favorite && 'favRecipe'}`} onClick={(e) => addTofavorite(recipe.id, e)}></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            )) : <div>{recipes}</div>
            }
        </div>
    )
}


export default Recettes