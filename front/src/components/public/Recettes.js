import React, { useEffect, useState, useRef } from "react";
import './recettes.css';
import { recipeService } from '../../_services/recipe.service'
import { Link } from "react-router-dom";


const Recettes = () => {

    // STATES //
    const [recipes, setRecipes] = useState([])
    const [isLoad, setISload] = useState(false) // while false block acces to cocktails var
    const [refNotfound, setRefNotfound] = useState(false)


    // REFERENCES //
    const flag = useRef(false)


    // API CALL FOR GET RECIPES //
    useEffect(() => {

        if (flag.current === false) {
            recipeService.getAllRecipes()
            .then(res => {
                setRecipes(res.data.data)
                setISload(true) // when true allow access to recipes state 
            })
            .catch(err => {
                if (err.response && err.response.status) {
                    setRecipes(err.response.data.data)
                    setRefNotfound(true)
                    setISload(true)
                } else {
                    console.log('Error:', err.message)
                }
            })
        }
        return () => flag.current = true
    }, [])


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
            )) : <div>{recipes}</div>
            }
        </div>
    )
}


export default Recettes;
