import React from 'react';
import './footer.css';


const Footer = () => {
     return (
        <div className='footer'>
            <div className='copyright'>
               &copy; 2023 biobey, all right reserved
            </div>
            <div className='info_contact'>
               <div className='contact'>
                  <p className='text_contact'>Contact |</p>&nbsp;
                  <i class="fa-solid fa-envelope"></i>
                  <p>abdennour@gmail.com</p>&nbsp;
                  <i class="fa-solid fa-square-phone"></i>
                  <p>+213 658 56 91</p>
               </div>
               <div className='social'>
                  <p className='text_social'>Suivez nous |</p>
                  <i class="fa-brands fa-square-instagram"></i>  
                  <i class="fa-brands fa-square-facebook"></i> 
               </div>
            </div>
        </div>
     )
}

export default Footer;