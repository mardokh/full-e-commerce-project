import React from 'react'
import { Link } from 'react-router-dom'
import './sideMenu.css'

const SideMenu = () => {

    return (
        <div>
            <ul className='admin_sideMenu'>
                <li><Link to="products_manage">products</Link></li>
                <li><Link to="commandes_manage">commands</Link></li>
                <li><Link to="recipes_manage">recipes</Link></li>
            </ul>
        </div>
    )
}

export default SideMenu