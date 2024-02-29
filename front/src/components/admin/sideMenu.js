import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sideMenu.css';

const SideMenu = () => {

    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (itemName) => {
        setSelectedItem(itemName);
    };

    return (
        <div className='admin_sideMenu_global_container'>
            <div className='admin_sideMenu'>
                <Link to="products_manage" >
                    <p className={`admin_menu_list_item ${selectedItem === 'products' ? 'admin_sideMenu_selected' : ''}`} onClick={() => handleItemClick('products')}>
                        <i className="fa-solid fa-boxes-stacked"></i>
                        <span>products</span>
                    </p>
                </Link>

                <Link to="commandes_manage" >
                    <p className={`admin_menu_list_item ${selectedItem === 'commands' ? 'admin_sideMenu_selected' : ''}`} onClick={() => handleItemClick('commands')}>
                        <i className="fa-solid fa-note-sticky"></i>
                        <span>commands</span>
                    </p>
                </Link>

                <Link to="recipes_manage" >
                    <p className={`admin_menu_list_item ${selectedItem === 'recipes' ? 'admin_sideMenu_selected' : ''}`} onClick={() => handleItemClick('recipes')}>
                        <i className="fa-solid fa-list-check"></i>
                        <span>recipes</span>
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default SideMenu;
