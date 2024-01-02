import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {

    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li><Link to="products_manage">Gestion des produits</Link></li>
                        <li><Link to="commandes_manage">Gestion des commandes</Link></li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Header