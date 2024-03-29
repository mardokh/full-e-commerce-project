import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout, ProductsManage, CommandesManage, EditProductManage, AddRecipeManage, RecipeManage, EditRecipeManage } from '../Admin'
import Error from '../../_utils/error' 


const AdminRouter = () => {
    
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route index element={<ProductsManage/>} />
                <Route path='/products_manage' element={<ProductsManage/>} />
                <Route path='/commandes_manage' element={<CommandesManage/>} />
                <Route path='/edit_product/:id' element={<EditProductManage/>} />
                <Route path='/add_recipe' element={<AddRecipeManage/>} />
                <Route path='/recipes_manage' element={<RecipeManage/>} />
                <Route path='/edit_recipe/:id' element={<EditRecipeManage/>} />
                <Route path='*' element={<Error/>} />
            </Route>
        </Routes>
    )
}


export default AdminRouter