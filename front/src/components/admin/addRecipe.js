import React, { useRef, useState, useContext } from "react"
import "./addRecipe.css"
import { recipeService } from '../../_services/recipe.service'
import MyContext from '../../_utils/contexts'
const AddImage = require('../../images/AddImage.jpg')


const AddRecipe = () => {

    // STATES //
    const [recipe, setRecipe] = useState({name: "", description: "", image: ""})
    const [imageUrl, setImageUrl] = useState()
    const { updateRecipesAddDisplay } = useContext(MyContext)
    const { updateRecipesOnAdd } = useContext(MyContext)


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

            // Update recipes state
            updateRecipesOnAdd(true)

            // Close add recipe windows
            updateRecipesAddDisplay(false)
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

    const closeAddRecipeWindows = () => {
        updateRecipesAddDisplay(false)
    }


    return (
        <div className="add_recipe_global_container">
            <i class="fa-solid fa-circle-xmark" id='add_recipe_close_icon' onClick={closeAddRecipeWindows}></i>
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
                    <input className='btn_new_recipe_add' type='submit' value="confirmer"/>
                </div>
            </form>
        </div>
    )
}

export default AddRecipe