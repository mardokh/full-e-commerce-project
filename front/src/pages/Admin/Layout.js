import React, {useContext} from 'react'
import { Outlet } from 'react-router-dom';
import SideMenu from '../../components/admin/sideMenu'
import Header from '../../components/admin/Header'
import MyContext from '../../_utils/contexts'
import AddProduct from '../../components/admin/addProduct'
import AddRecipe from '../../components/admin/addRecipe'
import EditProduct from '../../components/admin/editProduct'
import EditRecipe from '../../components/admin/editRecipe'
import './layout.css'


const Layout = () => {

    const { productsAddDisplay } = useContext(MyContext)
    const { recipesAddDisplay } = useContext(MyContext)
    const { productsEditDisplay } = useContext(MyContext)
    const { recipesEditDisplay } = useContext(MyContext)
    
    
    return (
        <div className='admin_layout_global'>
            {productsAddDisplay &&
                <div className='product_manage_add_product_container'>
                    <AddProduct />
                </div>
            }
            {recipesAddDisplay &&
                <div className='recipe_manage_add_recipe_container'>
                    <AddRecipe />
                </div>
            }
            {productsEditDisplay &&
                <div className='product_manage_edit_product_container'>
                    <EditProduct />
                </div>
            }
            {recipesEditDisplay &&
                <div className='recipe_manage_edit_recipe_container'>
                    <EditRecipe />
                </div>
            }
            <div className='admin_layout_header'><Header /></div>
            <div className='admin_layout'>
                <SideMenu />
                <Outlet />
            </div>
        </div>
    )
}

export default Layout