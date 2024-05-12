import React, { useEffect, useRef, useState, useContext } from "react"
import { favoriteProductService } from "../../_services/favoriteProduct.service"
import "./favorites_products.css"
import MyContext from '../../_utils/contexts'
import CustomLoader from '../../_utils/customeLoader/customLoader'


const FavoritesProducts = () => {

    // STATES //
    const [products, setProducts] = useState([])
    const [isLoad, setISload] = useState(false)
    const { updateFavoritesProductsCount } = useContext(MyContext)
     

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

            // Api call for get all favorites products
            const favorites_products_del = await favoriteProductService.favoriteProductCount()

            // Update state context
            updateFavoritesProductsCount(favorites_products_del.data.data.length)

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
        return <CustomLoader/>
    }


    return (
        <div className="favorites_Products_main_container">
            {refProducts.current ?
                products.map(product => (
                    <div key={product.favorite_product.id} className="favorites_Products_container">
                        <div className="favorites_Products_close_icon_container">
                            <i class="fa-solid fa-circle-xmark" id="favorites_Products_close_icon" onClick={() => deleteFavoriteProduct(product.favorite_product.id)}></i>
                        </div>
                        <div className="favorites_Products_image" style={{backgroundImage: `url('http://localhost:8989/uploads/${product.favorite_product.image}')`}}></div>
                        <div className="favorites_Products_name">
                            <p>{product.favorite_product.name}</p>
                        </div>
                    </div>  
                )) : (<div>{products}</div>)
            }
        </div>
    )
}


export default FavoritesProducts