import React, { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { productService } from "../../_services/product.service"
import "./product_details.css"


const ProductDetails = () => {

    // STATES
    const [product, setProduct] = useState([])
    const [isLoad, setISload] = useState(false)


    // GET ID PARAMS
    const {id} = useParams()


    // REFERENCES //
    const flag = useRef(false)


    // API CALL FOR GET PRODUCT //
    useEffect(() => {

        if (flag.current === false) {
            productService.getOneProduct(id)
            .then(res => {
                setProduct(res.data.data)
                setISload(true)
            })
            .catch(err => console.error('Error : ', err))
        }
        return () => flag.current = true
    }, [])
    

    // LOADING //
    if (!isLoad) {
        return <div>Loading ...</div>
    }

   
    return (
        <div className="details_global_container">
                <div className="details_img_container" style={{backgroundImage: `url('http://localhost:8989/uploads/${product.image}')`}}></div>
                    <div className="details_info_container">
                        <p>{product.name}</p>
                        <p>Prix : {product.price}</p>
                        <p>Details : {product.details}</p>
                        <button className="details_btn">Ajouter au panier</button>
                    </div>
        </div>
    )
   
}



export default ProductDetails