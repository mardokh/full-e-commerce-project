import React from 'react';
import {Link } from 'react-router-dom';
import './recettes_banner.css';
import recettesemaine from '../../images/recettesemaine.jpg';


const RecettesBanner = () => {

    return (
        <div className='banner_container'>
            <div 
                className='img_banner' style={{backgroundImage:`url(${recettesemaine})`}}>
            </div>
            <div className='frame'>
                <div className='sub_fram'>Les meuilleurs recettes pour la meuilleurs des santées</div>
                <i className='sub_link'><Link><i class="fa-solid fa-caret-up"></i>RECETTE DE LA SEMAINE<i class="fa-solid fa-caret-up fa_right"></i></Link></i>
            </div>
        </div>
    )
}

export default RecettesBanner;