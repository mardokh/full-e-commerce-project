// MODULES //
import React, { useEffect, useRef, useState, useContext } from "react"
import { shoppingSerive } from '../../_services/shoppingCart.service'
import './panier.css'
import OurProducts from '../../components/public/our_products'
import Footer from '../../components/public/Footer'
import Cookies from 'js-cookie'
import MyContext from '../../_utils/contexts'
import { favoriteProductService } from '../../_services/favoriteProduct.service'
import CustomLoader from '../../_utils/customeLoader/customLoader'



// MAIN FUNCTION //
const Panier = () => {

    // STATES //
    const [products, setProducts] = useState()
    const [isLoad, setISload] = useState(false)   
    const [refConfirm, setRefConfirm] = useState()
    const [refNotfound, setRefNotfound] = useState(false)
    const { updateShoppingCartCount } = useContext(MyContext)
    const { updateFavoritesProductsCount } = useContext(MyContext)

    
    // REFERENCE //
    const refuseEffect = useRef(false)


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
    const getShopping = async () => {

        try {
            // Get all products 
            const shoppingResponse = await shoppingSerive.shoppingGet()

            const shoppingData = shoppingResponse.data.data

            // Get cookie from browser
            const isFavoritesCookieExists = Cookies.get('client_id_favorites_products')

            // If cookie exist
            if (isFavoritesCookieExists) {

                // Get all favotes products
                const favoritesProducts = await favoriteProductService.favoriteProductGetAll()

                if (favoritesProducts.data.data === "aucun produit favori") {

                    //Update state
                    setProducts(shoppingData)

                    // Update loader 
                    setISload(true)
                }
                else {
                    // Get favorite product id from favoritesProducts table
                    const favoriteIds = favoritesProducts.data.data.map(favorite => favorite.product_id)

                    // Update state
                    setProducts(shoppingData.map(shopping => ({
                        id: shopping.shopping_cart_product.id,
                        name: shopping.shopping_cart_product.name,
                        price: shopping.shopping_cart_product.price,
                        image: shopping.shopping_cart_product.image,
                        total_price: shopping.total_price,
                        product_count: shopping.product_count,
                        favorite: favoriteIds.includes(shopping.shopping_cart_product.id) ? true : false
                    })))

                    // Update loader 
                    setISload(true)
                }
            }
            else {
                //Update state
                setProducts(shoppingData)

                // Update loader 
                setISload(true)
            }
        }
        catch (err) {
            handleError(err)
        }
    }


    // GET ALL PRODUCTS ADDS IN SHOPPING CART //
    useEffect(() => {

        if (refuseEffect.current === false) {
            getShopping()
        }
        return () => refuseEffect.current = true
    }, [])


    // INCREASE PRODUCTS QUANTITY HANDLE //
    const upQuantity = async (productId) => {
        try {
            // Set product id
            const cartItem = { id: productId }

            // Api call for add product
            await shoppingSerive.shoppingAdd(cartItem)

            // Api call for get product
            await shoppingSerive.shoppingGet()
            
            // Update state
            getShopping()
        }
        catch (err) {
            console.error(err)
        }
    }


    // DECREASE PRODUCT QUANTITY HANDLE //
    const downQuantity = async (productId) => {
        try {
            const currentProduct = products.find(product => product.id === productId)

            if (currentProduct.product_count > 1) {
                // api call for subtracting product
                await shoppingSerive.shoppingDelete(productId)

                // api call for get product
                await shoppingSerive.shoppingGet()

                // Update state
                getShopping()
            }
        } catch (err) {
            console.error(err)
        }
    }


    // WRITE PRODUCTS QUANTITY HANDLE //
    const writeQuantity = (index, newQuantity) => {
        try {
            const updatedProducts = [...products]
            updatedProducts[index].product_count = newQuantity
            setProducts(updatedProducts)
            setRefConfirm(index)
        }
        catch (err) {
            console.error(err)
        }
    }


    //CHOOSED PRODUCTS QUANTITY HANDLE //
    const choosedQuantity = async (newQuantity, productId) => {
        try {
           
            newQuantity === "" && (newQuantity = 1)
    
            // Set product id
            const cartItem = { id: productId, quantity: newQuantity }
    
            // Api call for add product
            await shoppingSerive.shoppingAdd(cartItem)
    
            // Api call for get product
            await shoppingSerive.shoppingGet()

            // Update state
            getShopping()
        }
        catch (err) {
            console.error(err)
        }
    }


    // DELETE AN SHOPPING CART //
    const deleteCarts = async (productId) => {

        try {
            // api call for delete product
            await shoppingSerive.shoppingSomesDelete(productId)

            // api call for get product
            const product = await shoppingSerive.shoppingGet()

            // Update context
            updateShoppingCartCount(product.data.data.length)
            
            // Update state
            getShopping()


        }
        catch (err) {
            handleError(err)
        }
    }


    // ADD PRODUCT TO FAVORITES //
    const addTofavorite = async (productId, event) => {
        try {
            // Get css style of icon 
            const heartIcon = event.currentTarget
            const computedStyle = window.getComputedStyle(heartIcon)
            const color = computedStyle.getPropertyValue('fill')
    
            if (color === 'rgb(0, 0, 0)') {
                
                // Api call for add favorite product
                const favorites_products_add = await favoriteProductService.favoriteProductAdd({ id: productId })

                // Update state context
                updateFavoritesProductsCount(favorites_products_add.data.data.length)

                // Change icon color
                heartIcon.style.fill = 'rgba(228, 60, 60)'

            } else {
                // Api call for delete favorite product
                await favoriteProductService.favoriteProductDelete(productId)

                // Api call for get all favorites products
                const favorites_products_del = await favoriteProductService.favoriteProductCount()

                // Update context
                updateFavoritesProductsCount(favorites_products_del.data.data.length)

                // Change icon color
                heartIcon.style.fill = 'rgb(0, 0, 0)'
            }
        } catch (err) {
            console.error(err)
        }
    }
    
   
    // LOADER //
    if (!isLoad) {
        return <CustomLoader/>
    }


    // RENDERING //
    return (
        <div className="main_container">
            <div className="shopping_product_global">
                <div className="shopping_product_content_items">
                    {!refNotfound ? (
                    products.map((shopping, index) => (
                            <div key={shopping.id} className="shopping_product_container">
                                <div className="shopping_img_and_details_container">
                                    <div className="shopping_product_img" style={{backgroundImage: `url('http://localhost:8989/uploads/${shopping.image}')`}}></div>
                                    <div className="shopping_product_details_container">
                                        <div className="shopping_product_item product_item_name">
                                            <p>{shopping.name}</p>
                                        </div>
                                        <div className="shopping_product_item product_item_price">
                                            <p>Prix unitaire :</p>
                                            <p>{shopping.price} da</p>
                                        </div>
                                        <div className="shopping_product_item product_item_quantity">
                                            <p>Quantité :</p>
                                            <div className="quantity_container">
                                                <input type="number" max="90" min="1" className="quantity_input" value={shopping.product_count}
                                                    onChange={(e) => writeQuantity(index, e.target.value)}
                                                />
                                                {index === refConfirm && <div onClick={() => choosedQuantity(shopping.product_count, shopping.id)} className="btn_confirm_quantity" >confirmer</div>}
                                                <div className="btn_up_down">
                                                    <button onClick={() => upQuantity(shopping.id)}>+</button>
                                                    <button onClick={() => downQuantity(shopping.id)}>-</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="shopping_product_item product_item_totalPrice">
                                            <p>Montant total :</p>
                                            <p>{shopping.total_price} da</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="shopping_fav_and_delete_container">
                                    <div className="shopping_fav_icon_container">
                                        <p>Ajouter au favoris</p>
                                        <svg style={shopping.favorite === true ? {height:'20px', width:'20px', fill: 'rgba(228, 60, 60)', cursor: 'pointer'} : {height:'20px', width:'20px', fill: 'black', cursor: 'pointer'}} onClick={(e) => addTofavorite(shopping.id, e)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/>
                                        </svg>
                                    </div>
                                    <div className="shopping_remove_icon_contenaire">
                                        <p>Supprimer</p>
                                        <svg data-v-84c63b90="" data-v-94da03a8="" onClick={() => deleteCarts(shopping.id)} xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" cursor="pointer" role="presentation" class="svg" data-v-8ffe78fc=""><g data-v-84c63b90="" fill="currentColor" stroke="currentColor"><svg data-v-94da03a8="" data-v-84c63b90="" viewBox="0 0 20 20" stroke="none" fill="none" xmlns="http://www.w3.org/2000/svg" class="">
                                            <path data-v-94da03a8="" data-v-84c63b90="" d="M3 5H4.55556L17 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path data-v-94da03a8="" data-v-84c63b90="" d="M7.14286 5V3.4C7.14286 3.0287 7.29337 2.6726 7.56128 2.41005C7.82919 2.1475 8.19255 2 8.57143 2H11.4286C11.8075 2 12.1708 2.1475 12.4387 2.41005C12.7066 2.6726 12.8571 3.0287 12.8571 3.4V5M15 5V15.6C15 15.9713 14.8495 16.3274 14.5816 16.5899C14.3137 16.8525 13.9503 17 13.5714 17H6.42857C6.04969 17 5.68633 16.8525 5.41842 16.5899C5.15051 16.3274 5 15.9713 5 15.6V5H10H15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg></g></svg>
                                    </div>
                                </div>
                            </div>
                    ))
                    )
                    : (
                        <>
                            <div className="shopping_no_product_add">
                                <p style={{fontSize: '22px'}}>{products}</p>
                                <div className="shopping_continue_back">
                                    <p>Continuer vos achats</p>
                                    <svg style={{width: '20px', height: '20px', fill: 'white'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                                </div>
                            </div>
                        </>
                    )
                    }
                </div>
                <div style={{display: !refNotfound ? "flex" : "none", flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: 'white', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' , width: '400px', height: '300px'}}>
                    <div className="shopping_total_price">
                        <p>Montant global :</p>
                        <p>{!refNotfound ? products.reduce((total, product) => total + parseFloat(product.total_price), 0).toFixed(2): null} da</p>
                    </div>
                    <div className="shopping_commande">
                        <p>Je commande</p>
                    </div>
                </div>
            </div>
            <div className="our_products_global_container">
                <h1>nos derniers produtis</h1>
                <OurProducts/>
            </div>
            <Footer />
        </div>
    ) 
}


// EXPORTS //
export default Panier