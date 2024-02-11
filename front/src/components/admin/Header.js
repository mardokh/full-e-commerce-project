import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AccountService } from '../../_services/account.service'

const Header = () => {

    // REDIRECTION //
    const navigate = useNavigate()

    // LOGOUT //
    const logout = () => {
        AccountService.logout()
        navigate("/auth/login")
    }

    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li><Link to="products_manage">Gestion des produits</Link></li>
                        <li><Link to="commandes_manage">Gestion des commandes</Link></li>
                        <li><Link to="recipes_manage">Gestion des recettes</Link></li>
                        <button onClick={logout} style={{cursor: 'pointer'}}>logout</button>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Header