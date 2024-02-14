import React from 'react'
import { Outlet } from 'react-router-dom';
import SideMenu from '../../components/admin/sideMenu'
import './layout.css'


const Layout = () => {
    
    return (

        <div className='admin_layout'>
            <SideMenu />
            <Outlet />
        </div>
        
    )
}

export default Layout