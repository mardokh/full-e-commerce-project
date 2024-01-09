import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { recipeService } from '../../_services/recipe.service'
import "./recipes.css"


const Recipes = () => {

    // STATES //
    const [recipes, setRecipes] = useState()
    const [isLoad, setISload] = useState(false) // while false block acces to recipes state
    const [refNotfound, setRefNotfound] = useState(false)


    // REFERENCE //
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


    // GET ALL RECIPES //
    useEffect(() => {
        if (flag.current === false) {
            recipeService.getAllRecipes()
                .then(res => {
                    setRecipes(res.data.data)
                    setISload(true)
                })
                .catch(err => handleError(err))
        }
        return () => flag.current = true 
    }, [])


    // DELETE RECIPE //
    const deleteRecipe = async (recipeId) => {

        try {
            // Api call for delete recipe
            await recipeService.deleteRecipe(recipeId)

            // Api call for get all recipes
            const recipesGet = await recipeService.getAllRecipes()

            // Update state
            setRecipes(recipesGet.data.data)
        }
        catch (err) {
            handleError(err)
        }
    }


    //Loader 
    if (!isLoad) {
        return <div>Loading...</div>
    }


    return (
        <div className='recipe_manage_global_container' title='ajouter un produit'>
            <Link to="../add_recipe"><div className='icon_add_recipe'><i class="fa-solid fa-plus"></i></div></Link>
            {!refNotfound ?
                recipes.map(recipe => (
                    <div key={recipe.id} className='recipe_manage_container'>
                        <div className='recipe_manage manage_name_r'>
                            <p className='r_title'>Nom de la recette</p>
                            <p className='r_name'>{recipe.name}</p>
                        </div>
                        <div className='recipe_manage manage_description_r'>
                            <p className='r_title'>Description</p>
                            <p className='r_price'>{recipe.description}</p>
                        </div>
                        <div className='recipe_manage manage_note_r'>
                            <p className='r_title'>Note d'evalution</p>
                            <p className='r_note'>{recipe.note}</p>
                        </div>
                        <div className='recipe_manage manage_date_r'>
                            <p className='r_title'>Date de creation</p>
                            <p className='r_createdAt'>{recipe.createdAt}</p>
                        </div>
                        <div className='recipe_manage manage_icons_r'>
                            <Link to={`../edit_recipe/${recipe.id}`}><i class="fa-solid fa-pen-to-square"></i></Link>
                            <i onClick={() => deleteRecipe(recipe.id)} class="fa-solid fa-trash"></i>
                        </div>
                    </div>
                )) : <div>{recipes}</div> 
            }
        </div>
    )


}


export default Recipes