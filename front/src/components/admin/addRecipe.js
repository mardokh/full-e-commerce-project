import React, { useRef, useState } from "react"
import "./addRecipe.css"
import { recipeService } from '../../_services/recipe.service'
import { useNavigate } from 'react-router-dom'
const AddImage = require('../../images/AddImage.jpg')


const AddRecipe = () => {

    // STATES //
    const [recipe, setRecipe] = useState({name: "", description: "", image: ""})
    const [imageUrl, setImageUrl] = useState()


    // REDERECTIONS //
    const navigate = useNavigate()


    // REFERENCE //
    const imageFlag = useRef(false)


    // SUBMIT FROM //
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const formData = new FormData()
            formData.append('name', recipe.name)
            formData.append('description', recipe.description)
            formData.append('image', recipe.image)

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


    // UPDATE IMAGE STATE //
    const handleImageChange = (image) => {
        setRecipe({
            ...recipe,
            image: image
        })

        if (image) {
            const urlImage = URL.createObjectURL(image)
            setImageUrl(urlImage)
            imageFlag.current = true
        }
    }



    return (
        <div className="add_recipe_global_container">
            <div className="add_recipe_image" style={{backgroundImage: `url('${!imageFlag.current ? AddImage : imageUrl}')`,}}></div>
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