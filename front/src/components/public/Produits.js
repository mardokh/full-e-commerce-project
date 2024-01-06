import React, { useEffect, useRef, useState } from 'react'
import './produits.css'
import { productService } from '../../_services/product.service'
import { shoppingSerive } from '../../_services/shoppingCart.service'
import { useNavigate, Link } from 'react-router-dom'

const Produits = () => {

    // States //
    const [products, setProducts] = useState([])
    const [isLoad, setISload] = useState(false) // while false block acces to cocktails var
    const [refNotfound, setRefNotfound] = useState(false)

    // globals variabls
    const navigate = useNavigate() 

    // Reference //
    const flag = useRef(false)

    
    // Get all cocktails //
    useEffect(() => {
        if (flag.current === false) {
            productService.getAllproducts()
                .then(res => {            
                    setProducts(res.data.data);
                    setISload(true);  // when true allow access to cocktails var  
                })
                .catch(err => {
                    if (err.response && err.response.status) {
                        setRefNotfound(true)
                        setISload(true)
                    } else {
                        console.error('Error:', err.message)
                    }
                })
        }
        return () => flag.current = true
    }, [])


    const addToCart = async (productId) => {
        try {
            // Api call for add product
            await shoppingSerive.shoppingAdd({ id: productId })
    
            // Redirect to shopping cart
            navigate('/panier')
            
        } catch (err) {
            console.error(err)
        }
    };
    

    // Loader //
    if (!isLoad) {
        return <div>Loading...</div>
    }

    // Rendering //
    return (
        <div className="produits_parent_container">
            {!refNotfound ?
                products.map(product => (
                <div key={product.id} className='produits_img_englob'>
                    <i class="fa-regular fa-heart"></i>
                    <Link to={`/produit_details/${product.id}`}>{<div className='produits_img_container' style={{backgroundImage: `url('http://localhost:8989/uploads/${product.image}')`}}></div>}</Link>
                    <div className='produit_info'>
                        <p className='produits_name'>{product.name}</p>
                        <div className='prix_notes'>
                            <p>{product.price}</p>
                            <div className='produits_note'>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>
                        </div>
                        <button className='add_cart' onClick={() => addToCart(product.id)}>ajouter au panier</button>
                    </div>
                </div>
                )) : <div>aucun produit ajouter</div> 
            }
        </div>
    )
}

export default Produits;
