import React, { useEffect, useRef, useState, useContext } from 'react'
import './produits.css'
import { productService } from '../../_services/product.service'
import { shoppingSerive } from '../../_services/shoppingCart.service'
import { useNavigate, Link } from 'react-router-dom'
import { favoriteProductService } from '../../_services/favoriteProduct.service'
//import Cookies from 'js-cookie'
import MyContext from '../../_utils/contexts'
import CustomLoader from '../../_utils/customeLoader/customLoader'



const Produits = () => {

    // States //
    const [products, setProducts] = useState()
    const [isLoad, setISload] = useState(false)
    const [refNotfound, setRefNotfound] = useState(false)
    const { updateFavoritesProductsCount } = useContext(MyContext)
    const { updateProductsNotesDisplay } = useContext(MyContext)
    const { updateProductsNotesId } = useContext(MyContext)
    const { updateShoppingCartCount } = useContext(MyContext)


    // Navigate
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


    // GET ALL PRODUCTS FUNCTION //
    const getProducts = async () => {

        try {
            // Get all products 
            const productsResponse = await productService.getAllproducts()

            const productsData = productsResponse.data.data
            
            // Get all favotes products
            const favoritesProducts = await favoriteProductService.favoriteProductGetAll()
        
            // Get favorite product id from favoritesProducts table
            const favoriteIds = favoritesProducts.data.data === "aucun produit favori" ? false : favoritesProducts.data.data.map(favorite => favorite.product_id) 

            // Update state
            setProducts(productsData.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
                note: product.note,
                image: product.image,
                favorite: favoriteIds === false ? false : favoriteIds.includes(product.id) ? true : false
            })))

            // Update loader 
            setISload(true)
        }
        catch (err) {
            handleError(err)
        }
    }


    // API CALL FOR GET ALL PRODUCTS //
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

            const shopping_cart_add = await shoppingSerive.shoppingGet()

            updateShoppingCartCount(shopping_cart_add.data.data.length)
    
            // Redirect to shopping cart
            navigate('/panier')
            
        } catch (err) {
            console.error(err)
        }
    }


    // ADD PRODUCT TO FAVORITES //
    const addTofavorite = async (productId, event) => {
        try {
            // Get css style of icon 
            const heartIcon = event.currentTarget
            const computedStyle = window.getComputedStyle(heartIcon)
            const color = computedStyle.color
    
            if (color === 'rgba(0, 128, 0, 0.45)') {
                
                // Api call for add favorite product
                const favorites_products_add = await favoriteProductService.favoriteProductAdd({ id: productId })

                // Update state context
                updateFavoritesProductsCount(favorites_products_add.data.data.length)

                // Change icon color
                heartIcon.style.color = 'rgb(228, 60, 60)'

            } else {
                // Api call for delete favorite product
                await favoriteProductService.favoriteProductDelete(productId)

                // Api call for get all favorites products
                const favorites_products_del = await favoriteProductService.favoriteProductCount()

                // Update context
                updateFavoritesProductsCount(favorites_products_del.data.data.length)

                // Change icon color
                heartIcon.style.color = 'rgba(0, 128, 0, 0.45)'
            }
        } catch (err) {
            console.error(err)
        }
    }

    const displayNotesForm = (productId) => {
        updateProductsNotesDisplay(true)
        updateProductsNotesId(productId)
    }

    
    // Loader //
    if (!isLoad) {
        return <CustomLoader/>
    }


    // Rendering //
    return (
        <div className="produits_parent_container">
            {!refNotfound ?
                products.map(product => (
                <div key={product.id} className='produits_img_englob'>
                    <Link><i class={`fa-solid fa-heart ${product.favorite && 'favorite'}`} onClick={(e) => addTofavorite(product.id, e)}></i></Link>
                    <Link to={`/produit_details/${product.id}`}>{<div className='produits_img_container' style={{backgroundImage: `url('http://localhost:8989/uploads/${product.image}')`}}></div>}</Link>
                    <div className='produit_info'>
                        <p className='produits_name'>{product.name}</p>
                        <div className='prix_notes'>
                            <p>{product.price} Da</p>
                            <div className='produits_note'>
                                <Link onClick={() => displayNotesForm(product.id)}>
                                    <i className="fa-solid fa-star" style={{ color: product.note >= 1 ? 'gold' : '' }}></i>
                                    <i className="fa-solid fa-star" style={{ color: product.note >= 2 ? 'gold' : '' }}></i>
                                    <i className="fa-solid fa-star" style={{ color: product.note >= 3 ? 'gold' : '' }}></i>
                                    <i className="fa-solid fa-star" style={{ color: product.note >= 4 ? 'gold' : '' }}></i>
                                    <i className="fa-solid fa-star" style={{ color: product.note >= 5 ? 'gold' : '' }}></i>
                                </Link>
                            </div>
                        </div>
                        <button className='add_cart' onClick={() => addToCart(product.id)}>ajouter au panier</button>
                    </div>
                </div>
                )) : <div className='produits_section_vide'>
                        <p>{products}</p>
                    </div>
            }
        </div>
    )
}


// MODULES EXPORTS //
export default Produits 