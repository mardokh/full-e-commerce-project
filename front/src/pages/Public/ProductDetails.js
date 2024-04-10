import React, { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { productService } from "../../_services/product.service"
import "./product_details.css"


const ProductDetails = () => {

    // STATES
    const [product, setProduct] = useState([])
    const [isLoad, setISload] = useState(false)
    const [SideImage, setSideImage] = useState("")
    const [sideImageActive, setSideImageActive] = useState(false)
    const [styleActive, setStyleActive] = useState(false)
    const [imageIndex, setImageIndex] = useState()


    // GET ID PARAMS
    const {id} = useParams()


    // REFERENCES //
    const flag = useRef(false)


    // API CALL FOR GET PRODUCT //
    useEffect(() => {

        if (flag.current === false) {
            productService.getOneProduct(id)
            .then(res => {
                //console.log(res)
                setProduct(res.data.data)
                setISload(true)
            })
            .catch(err => console.error('Error : ', err))
        }
        return () => flag.current = true
    }, [])


    // DISPLAY SIDE IMAGE TO MAIN //
    const cornerImageDisplay = (image, index) => {
        setImageIndex(index)
        setStyleActive(true)
        setSideImage(image)
        setSideImageActive(true)
    }
    

    // LOADING //
    if (!isLoad) {
        return <div>Loading ...</div>
    }
    

    return (
        <div className="details_global_container">
                <div className="details_sideImg_img_container">
                    <div className="details_side_img">
                        {product.product_images.map((file, index) => (
                            <div key={index} className={styleActive && index === imageIndex ? "details_sideImg_img_active" : "details_sideImg_img"} style={{backgroundImage: `url('http://localhost:8989/uploads/${file.images}')`}} onClick={() => cornerImageDisplay(file.images, index)}></div>
                        ))}
                    </div>
                    <div className="details_img_container" style={{backgroundImage: `url('http://localhost:8989/uploads/${sideImageActive ? SideImage : product.image}')`}}></div>
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