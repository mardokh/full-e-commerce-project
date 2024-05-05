import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/public/Header'
import './layout.css'
import Footer from '../../components/public/Footer'


const Layout = () => {
    return (
        <div className='public_layout'>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}


export default Layout


