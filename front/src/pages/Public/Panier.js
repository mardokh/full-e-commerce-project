// MODULES //
import React, { useEffect, useRef, useState } from "react"
import { shoppingSerive } from '../../_services/shoppingCart.service'
import './panier.css'

// MAIN FUNCTION //
const Panier = () => {

    // STATES //
    const [products, setProducts] = useState([])
    const [isLoad, setISload] = useState(false) // while false block acces to products state
    const [refConfirm, setRefConfirm] = useState()

    
    // REFERENCE //
    const refuseEffect = useRef(false)
    const refProducts = useRef(false)


    // GET ALL PRODUCTS ADDS IN SHOPPING CART //
    useEffect(() => {
        if (refuseEffect.current === false) {
            shoppingSerive.shoppingGet()
            .then(res => {
             // console.log(res) * debug
                if (res.data.data && res.data.data[0] && res.data.data[0].product) {      
                    refProducts.current = true
                }
                // console.log(res.data.data) * debug 
                setProducts(res.data.data)
                setISload(true) // when true allow acces to products state
            })
            .catch(err => console.log(err))
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
            const product = await shoppingSerive.shoppingGet()
            
            // Update state
            setProducts(product.data.data)
        }
        catch (err) {
            console.error(err)
        }
    }

    
    // DECREASE PRODUCT QUANTITY HANDLE //
    const downQuantity = async (productId) => {
        try {
            // api call for add product
            await shoppingSerive.shoppingDelete(productId)

            // api call for get product
            const product = await shoppingSerive.shoppingGet()
            
            // Update state
            setProducts(product.data.data)
        }
        catch (err) {
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
            //const updatedProducts = [...products]
            newQuantity === "" && (newQuantity = 1)
            //updatedProducts[index].product_count = newQuantity
            //setProducts(updatedProducts)
    
            // Set product id
            const cartItem = { id: productId, quantity: newQuantity }
    
            // Api call for add product
            await shoppingSerive.shoppingAdd(cartItem)
    
            // Api call for get product
            const product = await shoppingSerive.shoppingGet()

            // Update state
            setProducts(product.data.data)
        }
        catch (err) {
            console.error(err)
        }
    }
    
   
    // LOADER //
    if (!isLoad) {
        return <div>Loading...</div>
    }


    // RENDERING //
    return (
        <div className="main_container">
            {refProducts.current ? (    
            products.map((product, index) => (
                <div key={product.product.id} className="shopping_product_container">
                    <div className="shopping_product_item">
                        <p>produit</p>
                        <p>{product.product.name}</p>
                    </div>
                    <div className="shopping_product_item">
                        <p>prix unitaire</p>
                        <p>{product.product.price}</p>
                    </div>
                    <div className="shopping_product_item">
                        <p>quantité</p>
                        <div className="quantity_container">
                            <input type="number" max="90" min="1" className="quantity_input" value={product.product_count}
                                onChange={(e) => writeQuantity(index, e.target.value)}
                            />
                            {index === refConfirm && <div onClick={() => choosedQuantity(product.product_count, product.product.id)} className="btn_confirm_quantity" >confirmer</div>}
                            <div className="btn_up_down">
                                <button onClick={() => upQuantity(product.product.id)}>+</button>
                                <button onClick={() => downQuantity(product.product.id)}>-</button>
                            </div>
                        </div>
                    </div>
                    <div className="shopping_product_item">
                        <p>mentant total</p>
                        <p>{product.total_price} da</p>
                    </div>
                    <div className="btn_commande shopping_product_item">
                        <button className="btn_button">commander</button>
                    </div>
                </div>
            ))
            )
            : (<div className="no_product_add">{products}</div>)
            }
            <div className="total_products_price" style={{display: refProducts.current ? "initial" : "none"}}>
                <p>Total :</p>
                <p>{refProducts.current ? products.reduce((total, product) => total + parseFloat(product.total_price), 0).toFixed(2): null} da</p>
            </div>
        </div>
    ) 
}

// EXPORTS //
export default Panier