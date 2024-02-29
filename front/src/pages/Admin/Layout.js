import React, {useContext} from 'react'
import { Outlet } from 'react-router-dom';
import SideMenu from '../../components/admin/sideMenu'
import Header from '../../components/admin/Header'
import MyContext from '../../_utils/contexts'
import AddProduct from '../../components/admin/addProduct'
import AddRecipe from '../../components/admin/addRecipe'
import './layout.css'


const Layout = () => {

    const { productsAddDisplay } = useContext(MyContext)
    const { recipesAddDisplay } = useContext(MyContext)
    
    
    return (
        <div className='admin_layout_global'>
            {productsAddDisplay &&
                <div className='product_manage_add_product_container'>
                    <AddProduct />
                </div>
            }
            {recipesAddDisplay &&
                <div className='recipe_manage_add_product_container'>
                    <AddRecipe />
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