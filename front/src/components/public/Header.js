import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import logo from '../../images/logo.png';
import sun from '../../images/sun.png';


const Header = () => {

    return (
        <div className='header_div'>
            <header>
                <nav>
                    <ul>
                        <li><img src={logo} className='logo'/></li>
                        <div className='angles'>
                            <li className='home'><Link to="/home">Home</Link></li>
                            <li className='produits'><Link to="/produits">Produits</Link></li>
                            <li className='services'><Link to="/services">services</Link></li>
                        </div>
                        <li className='search_barre'><input placeholder='recherche'/><i class="fa-solid fa-magnifying-glass"></i></li>
                        <img src={sun} style={{height:'20px', width:'20px'}}/>
                        <li className='panier'><Link to="/panier"><i class="fa-sharp fa-solid fa-bag-shopping"></i><span>0</span></Link></li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Header;


