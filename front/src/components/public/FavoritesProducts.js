import React, { useEffect, useRef, useState } from "react"
import { favoriteProductService } from "../../_services/favoriteProduct.service"
import "./favorites_products.css"


const FavoritesProducts = () => {

    // STATES //
    const [products, setProducts] = useState([])
    const [isLoad, setISload] = useState(false) // while false block acces to products state
     

    // REFERENCE //
    const refUseEffect = useRef(false)
    const refProducts = useRef(false)


    // GET ALL PRODUCTS ADDS IN FAVORITES
    useEffect(() => {
        if (refUseEffect.current === false) {
            favoriteProductService.favoriteProductGetAll()
            .then(res => {
                if (res.data.data && res.data.data[0] && res.data.data[0].favorite_product) {      
                    refProducts.current = true
                }
                setProducts(res.data.data)
                setISload(true)
            })
            .catch(err => console.error(err))
        }
        return () => refUseEffect.current = true
    }, [])


    // DELETE FAVORITE //
    const deleteFavoriteProduct = async (productId) => {

        try {
            // Api call for delete favorite product
            await favoriteProductService.favoriteProductDelete(productId)

            // APi call for get favorites products
            const favoriteProduct = await favoriteProductService.favoriteProductGetAll()

            // Update state
            setProducts(favoriteProduct.data.data)

            if (favoriteProduct.data.data && favoriteProduct.data.data[0] && !favoriteProduct.data.data[0].favorite_product) {      
                refProducts.current = false
            }
        }
        catch (err) {
            console.error(err)
        }
    }
    

    // Loader //
    if (!isLoad) {
        return <div>Loading...</div>
    }


    return (
        <div className="favorites_Products_main_container">
            {refProducts.current ?
                products.map(product => (
                    <div key={product.favorite_product.id} className="favorites_Products_container">
                        <div className="favorites_Products_name favorites_Products_items">
                            <p>{product.favorite_product.name}</p>
                        </div>
                        <div className="favorites_Products_price favorites_Products_items">
                            <p>{product.favorite_product.price} Da</p>
                        </div>
                        <div>
                            <i onClick={() => deleteFavoriteProduct(product.favorite_product.id)} class="fa-solid fa-trash"></i>
                        </div>
                    </div>  
                )) : (<div>{products}</div>)
            }
        </div>
    )
}


export default FavoritesProducts