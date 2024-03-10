import React from 'react';
import './footer.css';


const Footer = () => {

   return (
      <div className='footer_container'>
         <div className='footer_sub_container'>
            <div className='footer_info_container'>
               <div className='footer_contact_container'>
                  <p>contact |</p>
                  <div className='footer_email'>
                     <i class="fa-solid fa-envelope" id='footer_email'></i>
                     <p>beynour@gmail.com</p>
                  </div>
                  <div className='footer_phone'>
                     <i class="fa-solid fa-square-phone" id='footer_phone'></i>
                     <p>+213 056 12 68 13</p>
                  </div>
               </div>
               <div className='footer_social_container'>
                  <p>suivez nous |</p>
                  <div className='footer_social_icons'>
                     <i class="fa-brands fa-square-instagram" id='footer_instagram'></i> 
                     <i class="fa-brands fa-square-facebook" id='footer_facebook'></i>
                  </div>
               </div>
            </div>
         </div>
         <div className='footer_copyright_container'>
            <div className='footer_under_line'></div>
            <div>beystore&copy;2024</div>
         </div>
      </div>
   )
} 



export default Footer;