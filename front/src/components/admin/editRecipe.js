import React, {useEffect, useState, useRef} from "react"
import "./editRecipe.css"
import { useNavigate, useParams } from "react-router-dom"
import { recipeService } from "../../_services/recipe.service"


const EditRecipe = () => {

    // STATES //
    const [recipe, setRecipe] = useState({name: "", description: "", image: ""})
    const [isLoad, setISload] = useState(false)
    const [imageUrl, setImageUrl] = useState()


    // GET ID PARAMS //
    const {id} = useParams()


    // REDIRECTION //
    const navigate = useNavigate()


    // REFERENCE //
    const effectFlag = useRef(false)
    const imageFlag = useRef(false)


    // API CALL FOR GET RECIPE //
    useEffect(() => {

        if (effectFlag.current === false) {
            recipeService.getOneRecipe(id)
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
            formData.append('id', id)

            // Api call for update recipe
            await recipeService.updateRecipe(formData)

            // Redirect to main recipes manage
            navigate('../recipes_manage')
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
    

    // LOADER //
    if (!isLoad) {
        return <div>Loading ...</div>
    }
    

    return (
    <div className="edit_recipe_global_container">
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