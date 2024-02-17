import React from 'react'
import { Outlet } from 'react-router-dom';
import SideMenu from '../../components/admin/sideMenu'
import Header from '../../components/admin/Header'
import './layout.css'


const Layout = () => {
    
    return (
        <div className='admin_layout_global'>
            <di className='admin_layout_header'><Header /></di>
            <div className='admin_layout'>
                <SideMenu />
                <Outlet />
            </div>
        </div>
    )
}

export default Layout