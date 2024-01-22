import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/public/Header'
import './layout.css'
import { MyProvider } from '../../_utils/contexts'


const Layout = () => {
    return (
        <MyProvider>
            <div className='public_layout'>
                <Header/>
                <Outlet/>
            </div>
        </MyProvider>
    )
}


export default Layout


