import React, { useEffect, useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { productService } from "../../_services/product.service"
import "./product_details.css"


const ProductDetails = () => {

    // STATES
    const [product, setProduct] = useState([])
    const [isLoad, setISload] = useState(false)
    const navigate = useNavigate()


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
                <div className="details_sideImg_img_container">
                    <div className="details_side_img"></div>
                    <div className="details_img_container" style={{backgroundImage: `url('http://localhost:8989/uploads/${product.image}')`}}></div>
                </div>
                <div className="details_info_container">
                    <p className="details_name">{product.name}</p>
                    <p className="details_price">Prix : {product.price}</p>
                    <button className="details_shopping_add_btn">Ajouter au panier</button>
                    <p>Details : {product.details}</p>
                </div>
        </div>
    )
   
}



export default ProductDetails