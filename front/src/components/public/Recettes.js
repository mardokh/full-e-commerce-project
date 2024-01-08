import React, { useEffect, useState, useRef } from "react";
import './recettes.css';
import { recipeService } from '../../_services/recipe.service'
import { Link } from "react-router-dom";


const Recettes = () => {

    // STATES //
    const [recipes, setRecipes] = useState([])


    // REFERENCES //
    const flag = useRef(false)


    // API CALL FOR GET RECIPES //
    useEffect(() => {

        if (flag.current === false) {
            recipeService.getAllRecipes()
            .then(res => {
                console.log(res.data.data)
                setRecipes(res.data.data)
            })
            .catch(err => console.error(err))
        }
        return () => flag.current = true
    }, [])


    return (
        <div className="recipe_global_container">
            {
            recipes.map(recipe => (
                <div key={recipe.id} className='pics_container_sub'>
                    <div className='pics_englob'>
                    <Link to={`/recette_details/${recipe.id}`}><div className='pics_container' style={{backgroundImage: `url('http://localhost:8989/uploads/${recipe.image}')`}}></div></Link>
                        <div className='info_container'>
                            <p className='recette_name'>{recipe.name}</p>
                            <div className="recettes_interactions">
                                <div className="recettes_note">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                </div>
                                <i class="fa-regular fa-bookmark"></i>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
        </div>
    )
}


export default Recettes;
