import React from "react";
import './recettes.css';
import Romesco from '../../images/Romesco.jpg';
import Springbeef from '../../images/Springbeef.jpg';
import Tomato from '../../images/Tomato.jpg';
import LemonBlueb from '../../images/LemonBlueb.jpg';


const Recettes = () => {
     return (
        <div>
            <div className='pics_container_sub'>
            <div className='pics_englob'>
                {<div className='pics_container' style={{backgroundImage:`url(${Springbeef})`}}></div>}
                <div className='info_container'>
                    <p className='recette_name'>Pommes de terre fourée au legums</p>
                    <div className="recettes_interactions">
                        <div className="recettes_note">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <i class="fa-regular fa-bookmark"></i>
                    </div>
                </div>
            </div>
            <div className='pics_englob'>
                {<div className='pics_container' style={{backgroundImage:`url(${Romesco})`}}></div>}
                <div className='info_container'>
                    <p className='recette_name'>Escalope aux brocolies</p>
                    <div className="recettes_interactions">
                        <div className="recettes_note">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <i class="fa-regular fa-bookmark"></i>
                    </div>
                </div>
            </div>
            <div className='pics_englob'>
                {<div className='pics_container' style={{backgroundImage:`url(${Tomato})`}}></div>}
                <div className='info_container'>
                    <p className='recette_name'>Boulettes de viande aux oignons</p>
                    <div className="recettes_interactions">
                        <div className="recettes_note">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <i class="fa-regular fa-bookmark"></i>
                    </div>
                </div>
            </div>
            <div className='pics_englob'>
                {<div className='pics_container' style={{backgroundImage:`url(${LemonBlueb})`}}></div>}
                <div className='info_container'>
                    <p className='recette_name'>Tartines a la confiture de cerises</p>
                    <div className="recettes_interactions">
                        <div className="recettes_note">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <i class="fa-regular fa-bookmark"></i>
                    </div>
                </div>
            </div>
            </div>
        </div>
     )
}


export default Recettes;
