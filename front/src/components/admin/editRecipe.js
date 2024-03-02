import React, {useEffect, useState, useRef, useContext} from "react"
import "./editRecipe.css"
import { recipeService } from "../../_services/recipe.service"
import MyContext from '../../_utils/contexts'
import CustomLoader from '../../_utils/customeLoader/customLoader'


const EditRecipe = () => {

    // STATES //
    const [recipe, setRecipe] = useState({name: "", description: "", image: ""})
    const [isLoad, setISload] = useState(false)
    const [imageUrl, setImageUrl] = useState()
    const { recipesEditId } = useContext(MyContext)
    const { updateRecipesEditDisplay } = useContext(MyContext)
    const { updateRecipesOnEdit } = useContext(MyContext)



    // REFERENCE //
    const effectFlag = useRef(false)
    const imageFlag = useRef(false)


    // API CALL FOR GET RECIPE //
    useEffect(() => {

        if (effectFlag.current === false) {
            recipeService.getOneRecipe(recipesEditId)
                .then(res => {
                    setRecipe(res.data.data)
                    setISload(true)
                })
                .catch(err => console.error('Error : ', err))
        }
        return () => effectFlag.current = true
    }, [])


    // FORM SUBMIT //
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // Create form data
            const formData = new FormData()
            formData.append('name', recipe.name)
            formData.append('description', recipe.description)
            formData.append('image', recipe.image)
            formData.append('id', recipesEditId)

            // Api call for update recipe
            await recipeService.updateRecipe(formData)

            // Update recipes state
            updateRecipesOnEdit(true)

            // Close edit recipe windows
            updateRecipesEditDisplay(false)

        }
        catch (err) {
            console.error('Error: ', err)
        }
    }

    
    // UPDATE INPUTS STATE //
    const handleInputChange = (name, value) => {
        setRecipe({
            ...recipe,
            [name]: value
        })
    }


    // INSERT IMAGE //
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


    const closeEditRecipeWindows = () => {
        updateRecipesEditDisplay(false)
    }
    

    // LOADER //
    if (!isLoad) {
        return <CustomLoader/>
    }
    

    return (
    <div className="edit_recipe_global_container">
       <i class="fa-solid fa-circle-xmark" id='edit_recipe_close_icon' onClick={closeEditRecipeWindows}></i>
       <div className="edit_recipe_image" style={{backgroundImage: `url('${!imageFlag.current ? `http://localhost:8989/uploads/${recipe.image}` : imageUrl}')`}}></div>
        <form className='edit_recipe_container' onSubmit={handleSubmit}>
            <div className='edit_recipe_item'>
                <label>Name</label>
                <input type='text' name='name' value={recipe.name} onChange={(e) => handleInputChange(e.target.name, e.target.value)}/>
            </div>
            <div className='edit_recipe_item'>
                <label>Description</label>
                <textarea name='description' value={recipe.description} onChange={(e) => handleInputChange(e.target.name, e.target.value)}></textarea>
            </div>
            <div className='edit_recipe_item'>
                <label>image</label>
                <input type='file' name='image' onChange={(e) => handleImageChange(e.target.files[0])} />
            </div>
            <div>
                <input className='btn_new_recipe_edit' type='submit' value="confirmer"/>
            </div>
        </form>
    </div>
    )
}


export default EditRecipe