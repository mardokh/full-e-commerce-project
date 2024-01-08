import React, { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { recipeService } from "../../_services/recipe.service"
import "./recipe_details.css"

const RecipeDetails = () => {

    // STATES //
    const [recipe, setRecipe] = useState()
    const [isLoad, setISload] = useState()


    // GET ID PARAMS //
    const {id} = useParams()
    

    // REFERENCE //
    const flag = useRef(false)


    // API CALL FOR GET RECIPE //
    useEffect(() => {
        if (flag.current === false) {
            recipeService.getOneRecipe(id)
                .then(res => {
                    setRecipe(res.data.data)
                    setISload(true)
                })
                .catch(err => console.error('Error : ', err))
        }
        return () => flag.current = true
    }, [])


    // LOADING //
    if (!isLoad) {
        return <div>Loading ...</div>
    }


    return (
        <div className="recipe_details_global_container">
                <div className="recipe_details_img_container" style={{backgroundImage: `url('http://localhost:8989/uploads/${recipe.image}')`}}></div>
                <div className="recipe_details_info_container">
                    <p>{recipe.name}</p>
                    <p>Description : {recipe.description}</p>
                    <button className="recipe_details_btn">Ajouter au favories</button>
                </div>
        </div>
    )
}


export default RecipeDetails