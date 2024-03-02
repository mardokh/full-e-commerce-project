import React, { useEffect, useRef, useState, useMemo, useContext } from 'react'
import { Link } from 'react-router-dom'
import { recipeService } from '../../_services/recipe.service'
import Pagination from '../../pagination/Pagination'
import "./recipes.css"
import MyContext from '../../_utils/contexts'
import CustomLoader from '../../_utils/customeLoader/customLoader'


const Recipes = () => {

    // STATES //
    const [recipes, setRecipes] = useState([])
    const [isLoad, setISload] = useState(false)
    const [refNotFound, setRefNotFound] = useState(false)
    const flag = useRef(false)
    const [currentPage, setCurrentPage] = useState(1);
    const { updateRecipesAddDisplay } = useContext(MyContext)
    const { recipesOnadd } = useContext(MyContext)
    const { recipesOnEdit } = useContext(MyContext)
    const { updateRecipesEditDisplay } = useContext(MyContext)
    const { updateRecipesEditId } = useContext(MyContext)
    let PageSize = 4;


    // MAIN LOAD PRODUCTS //
    const loadRecipes = () => {
        if (flag.current === false) {
            recipeService.getAllRecipes()
                .then(res => {
                    setRecipes(res.data.data)
                    setISload(true)
                })
                .catch(err => handleError(err))
        }
        return () => flag.current = true
    }


    // LOAD RECIPES ON PAGE LOAD //
    useEffect(() => {
        loadRecipes()
    }, [])


    // LOAD RECIPES ON PRODUCT ADD //
    if (recipesOnadd || recipesOnEdit) {
        loadRecipes()
    }


    // LOAD PRODUCTS ERRORS HANDLE //
    const handleError = (err) => {
        if (err.response && err.response.status) {
            setRefNotFound(true)
            setRecipes(err.response.data.data)
            setISload(true)
        } else {
            console.log('Error:', err.message)
        }
    }


    // DELETE AN RECIPE //
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


    // PAGINATION HANDLE 
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return recipes.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, recipes])


    // ADD RECIPE PAGE DISPLAYER //
    const displayRecipeAddForm = () => {
        updateRecipesAddDisplay(true)
    }


    const displayRecipeEditForm = (recipeId) => {
        updateRecipesEditDisplay(true)
        updateRecipesEditId(recipeId)
    }


    // AWAIT LOADER //
    if (!isLoad) {
        return <CustomLoader/>
    }


    // RENDERING //
    return (
        <div className='recipe_manage_global_container'>
            <div className='recipe_manage_sub_container'>
                <div className='recipe_manager_add' onClick={displayRecipeAddForm}><i class="fa-solid fa-plus" id='recipe_manage_add_icon'></i></div>
                <div className='recipe_manage_container'>
                    <table className='recipe_manage_table_container'>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Note</th>
                                <th>CreatedAt</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!refNotFound ? (
                                currentTableData.map(recipe => (
                                    <tr key={recipe.id}>
                                        <td className='recipe_manage_img_container' style={{backgroundImage: `url('http://localhost:8989/uploads/${recipe.image}')`}}></td>
                                        <td>{recipe.name}</td>
                                        <td>{recipe.description}</td>
                                        <td>{recipe.note}</td>
                                        <td>{recipe.createdAt}</td>
                                        <td className='recipe_manage manage_icons'>
                                            <button className='recipe_manage_btn_edit' onClick={() => displayRecipeEditForm(recipe.id)}>Edit</button>
                                            <button className='recipe_manage_btn_delete'  onClick={() => deleteRecipe(recipe.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No recipes found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={recipes.length}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </div>
            </div>
        </div>
    );
}


export default Recipes