import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './sideMenu.css'


const SideMenu = () => {

    const [selectedItem, setSelectedItem] = useState(null)
    const location = useLocation()


    useEffect(() => {
        const path = location.pathname;
        setSelectedItem(path.split('/')[2])
    }, [location])


    return (
        <div className='admin_sideMenu_global_container'>
            <div className='admin_sideMenu'>
                <Link to="products_manage">
                    <p className={`admin_menu_list_item ${selectedItem === 'products_manage' ? 'admin_sideMenu_selected' : ''}`}>
                        <i className="fa-solid fa-boxes-stacked"></i>
                        <span>products</span>
                    </p>
                </Link>

                <Link to="commandes_manage">
                    <p className={`admin_menu_list_item ${selectedItem === 'commandes_manage' ? 'admin_sideMenu_selected' : ''}`}>
                        <i className="fa-solid fa-note-sticky"></i>
                        <span>commands</span>
                    </p>
                </Link>

                <Link to="recipes_manage">
                    <p className={`admin_menu_list_item ${selectedItem === 'recipes_manage' ? 'admin_sideMenu_selected' : ''}`}>
                        <i className="fa-solid fa-list-check"></i>
                        <span>recipes</span>
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default SideMenu
