import React from 'react'
import { Link } from 'react-router-dom'
import './sideMenu.css'

const SideMenu = () => {

    return (
        <div className='admin_sideMenu_global_container'>
            <div className='admin_sideMenu'>
                    <Link to="products_manage" >
                        <p className='admin_menu_list_item'>
                            <i class="fa-solid fa-boxes-stacked"></i>
                            <span>products</span>
                        </p>
                    </Link>

                    <Link to="commandes_manage" >
                        <p className='admin_menu_list_item'>
                            <i class="fa-solid fa-note-sticky"></i>
                            <span>commands</span>
                        </p>
                    </Link>

                    <Link to="recipes_manage" >
                        <p className='admin_menu_list_item'>
                            <i class="fa-solid fa-list-check"></i>
                            <span>recipes</span>
                        </p>
                    </Link>
            </div>
        </div>
    )
}

export default SideMenu