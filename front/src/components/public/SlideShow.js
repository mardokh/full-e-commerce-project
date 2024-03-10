import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import homewallpaper from '../../images/homewallpaper.jpg';
import homewallpaper2 from '../../images/homewallpaper2.png';
import './slidershow.css';

const SlideShow = () => {

    return (
        <>
            <div className='slides fade'>
                <div style={{backgroundImage:`url(${homewallpaper})`}} className='image_slides'>
                </div>
                <p className='citation'>Le meuilleur du bio pour la meuilleur des santées</p>
            </div>
        </>
    )
}

export default SlideShow;
