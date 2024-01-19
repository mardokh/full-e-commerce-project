import React, { useEffect, useRef, useState } from 'react'
import './produits.css'
import { productService } from '../../_services/product.service'
import { shoppingSerive } from '../../_services/shoppingCart.service'
import { useNavigate, Link } from 'react-router-dom'
import { favoriteProductService } from '../../_services/favoriteProduct.service'
import Cookies from 'js-cookie'

const Produits = () => {

    // States //
    const [products, setProducts] = useState()
    const [isLoad, setISload] = useState(false) // while false block acces to cocktails var
    const [refNotfound, setRefNotfound] = useState(false)


    // globals variabls
    const navigate = useNavigate() 

    
    // Reference //
    const flag = useRef(false)


    // Handle errors
    const handleError = (err) => {
        if (err.response && err.response.status) {
            setRefNotfound(true)
            setProducts(err.response.data.data)
            setISload(true)
        } else {
            console.log('Error:', err.message)
        }
    }


    const getProducts = async () => {

        try {
            // Get all products 
            const productsResponse = await productService.getAllproducts()

            const productsData = productsResponse.data.data

            // Get cookie from browser
            const isFavoritesCookieExists = Cookies.get('client_id_favorites_products')

            // If cookie exist
            if (isFavoritesCookieExists) {

                // Get all favotes products
                const favoritesProducts = await favoriteProductService.favoriteProductGetAll()

                if (favoritesProducts.data.data === "aucun produit favori") {

                    //Update state
                    setProducts(productsData)

                    // Update loader 
                    setISload(true)
                }
                else {
                    // Get favorite produt id from favoritesProducts table
                    const favoriteIds = favoritesProducts.data.data.map(favorite => favorite.product_id)

                    // Update state
                    setProducts(productsData.map(product => ({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        favorite: favoriteIds.includes(product.id) ? true : false
                    })))

                    // Update loader 
                    setISload(true)
                }
            }
            else {
                //Update state
                setProducts(productsData)

                // Update loader 
                setISload(true)
            }
        }
        catch (err) {
            handleError(err)
        }
    }


    // GET ALL PRODUCTS //
    useEffect(() => {

        if (flag.current === false) {
            getProducts()
        }
        return () => flag.current = true
    }, [])


    // ADD PRODUCT TO SHOPPING CARTS //
    const addToCart = async (productId) => {
        try {
            // Api call for add product to shopping carts
            await shoppingSerive.shoppingAdd({ id: productId })
    
            // Redirect to shopping cart
            navigate('/panier')
            
        } catch (err) {
            console.error(err)
        }
    }


    // ADD PRODUCT TO FAVORITES //
    const addTofavorite = async (productId, event) => {
        try {
            const heartIcon = event.currentTarget
            const computedStyle = window.getComputedStyle(heartIcon)
            const color = computedStyle.color;
    
            if (color === 'rgba(0, 128, 0, 0.45)') {  
                await favoriteProductService.favoriteProductAdd({ id: productId })
                heartIcon.style.color = 'red'
            } else {
                await favoriteProductService.favoriteProductDelete(productId)
                heartIcon.style.color = 'rgba(0, 128, 0, 0.45)'
            }
        } catch (err) {
            console.error(err)
        }
    }
    

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
                    <Link><i class={`fa-regular fa-heart ${product.favorite && 'favorite'}`} onClick={(e) => addTofavorite(product.id, e)}></i></Link>
                    <Link to={`/produit_details/${product.id}`}>{<div className='produits_img_container' style={{backgroundImage: `url('http://localhost:8989/uploads/${product.image}')`}}></div>}</Link>
                    <div className='produit_info'>
                        <p className='produits_name'>{product.name}</p>
                        <div className='prix_notes'>
                            <p>{product.price} Da</p>
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
                )) : <div>{products}</div> 
            }
        </div>
    )
}

export default Produits 
