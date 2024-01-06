import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout, ProductsManage, CommandesManage, AddProductManage, EditProductManage, AddRecipeManage, RecipeManage } from '../Admin'
import Error from '../../_utils/error' 


const AdminRouter = () => {
    
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route index element={<ProductsManage/>} />
                <Route path='/products_manage' element={<ProductsManage/>} />
                <Route path='/commandes_manage' element={<CommandesManage/>} />
                <Route path='/add_product' element={<AddProductManage/>} />
                <Route path='/edit_product' element={<EditProductManage/>} />
                <Route path='/add_recipe' element={<AddRecipeManage/>} />
                <Route path='/recipes_manage' element={<RecipeManage/>} />
                <Route path='*' element={<Error/>} />
            </Route>
        </Routes>
    )
}


export default AdminRouter