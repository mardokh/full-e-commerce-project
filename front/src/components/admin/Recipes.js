import React, { useEffect, useRef, useState, useMemo, useContext } from 'react'
import { Link } from 'react-router-dom'
import { recipeService } from '../../_services/recipe.service'
import Pagination from '../../pagination/Pagination';
import "./recipes.css"
import MyContext from '../../_utils/contexts'


const Recipes = () => {

    // STATES //
    const [recipes, setRecipes] = useState([])
    const [isLoad, setISload] = useState(false) // while false block acces to recipes state
    const [refNotFound, setRefNotFound] = useState(false)
    const flag = useRef(false)
    const [currentPage, setCurrentPage] = useState(1);
    const { updateRecipesAddDisplay } = useContext(MyContext)
    const { recipesOnadd } = useContext(MyContext)
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


    // LOAD RECIPE ON PAGE LOAD //
    useEffect(() => {
        loadRecipes()
    }, [])


    // LOAD PRODUCT ON PRODUCT ADD //
    if (recipesOnadd) {
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


    // AWAIT LOADER //
    if (!isLoad) {
        return <div>Loading...</div>        
    }


    // RENDERING //
    return (
        <div className='recipe_manage_global_container'>
            <div className='recipe_manage_sub_container'>
                <div className='recipe_manager_add' onClick={displayRecipeAddForm}><p>+ add recipe</p></div>
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
                                            <Link to={`../edit_recipe/${recipe.id}`}><button className='recipe_manage_btn_edit' >Edit</button></Link>
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