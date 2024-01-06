import React, { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { recipeService } from '../../_services/recipe.service'
import "./addRecipe.css"


const AddRecipe = () => {

    // STATES //
    const [recipe, setRecipe] = useState({
        name: "",
        description: "",
        image: null
    })


    // GLOBAL VARIABLES //
    const navigate = useNavigate()


    // SUBMIT FROM //
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const formData = new FormData()
            formData.append('name', recipe.name)
            formData.append('description', recipe.description)
            formData.append('image', recipe.image)
            
            /* Debug
            console.log('name : ', formData.get('name'))
            console.log('description : ', formData.get('description'))
            console.log('image : ', formData.get('image'))
            */

            // Api call for add recipe
            await recipeService.addRecipe(formData)

            // Redirection 
            navigate('../recipes_manage')
        }
        catch (err) {
            console.error('Error : ', err)
        }
    }


    // UPDATE INPUTS STATE //
    const handleInputChange = (name, value) => {
        setRecipe({
            ...recipe,
            [name]: value
        })
    }


    // UPDATE INPUTS STATE //
    const handleImageChange = (image) => {
        setRecipe({
            ...recipe,
            image: image
        })
    }



    return (
        <div>
            <form className='add_recipe_container' onSubmit={handleSubmit}>
                <div className='add_recipe_item'>
                    <label>Name</label>
                    <input type='text' name='name' onChange={(e) => handleInputChange(e.target.name, e.target.value)}/>
                </div>
                <div className='add_recipe_item'>
                    <label>Description</label>
                    <textarea name='description' onChange={(e) => handleInputChange(e.target.name, e.target.value)}></textarea>
                </div>
                <div className='add_recipe_item'>
                    <label>image</label>
                    <input type='file' name='image' onChange={(e) => handleImageChange(e.target.files[0])}/>
                </div>
                <div>
                    <input className='btn_new_recipe_add' type='submit' value="Ajouter le produit"/>
                </div>
            </form>
        </div>
    )
}

export default AddRecipe