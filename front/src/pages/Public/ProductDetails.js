import React, { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { productService } from "../../_services/product.service"
import "./product_details.css"


const ProductDetails = () => {

    // STATES
    const [product, setProduct] = useState([])
    const [isLoad, setISload] = useState(false)
    const [styleActive, setStyleActive] = useState(false)
    const [imageIndex, setImageIndex] = useState(0)
    const [imageDefault, setImageDefault] = useState(true)
    const [nexImage, setNexImage] = useState("")
    const [nextImageActive, setNextImageActive] = useState(false)


    // GET ID PARAMS
    const {id} = useParams()


    // REFERENCES //
    const flag = useRef(false)
    const sideImagesContainer = useRef()


    // API CALL FOR GET PRODUCT //
    useEffect(() => {
        if (flag.current === false) {
            productService.getOneProduct(id)
            .then(res => {
                //console.log(res)
                const productData = res.data.data;
                // Add product.image to product.product_images array
                productData.product_images.unshift({ images: productData.image });
                setProduct(productData)
                setISload(true)
                setImageDefault(false)
                setStyleActive(true)
            })
            .catch(err => console.error('Error : ', err));
        }
        return () => flag.current = true;
    }, [])
    

    // DISPLAY SIDE IMAGE TO MAIN //
    const cornerImageDisplay = (image, index) => {
        setImageDefault(false)
        setImageIndex(index)
        setStyleActive(true)
        setNexImage(image)
        setNextImageActive(true)
    }


    const goImageRight = () => {
        setNextImageActive(true)
        let nextIndex = imageIndex + 1
        setImageIndex(nextIndex)
        setNexImage(product.product_images[nextIndex].images)
        const newScroll = sideImagesContainer.current.scrollTop + 200
        sideImagesContainer.current.scrollTo({top: newScroll, behavior: 'smooth'})
        
    }


    const goImageLeft = () => {
        setNextImageActive(true)
        let nextIndex = imageIndex - 1
        setImageIndex(nextIndex)
        setNexImage(product.product_images[nextIndex].images)
        const newScroll = sideImagesContainer.current.scrollTop - 200
        sideImagesContainer.current.scrollTo({top: newScroll, behavior: 'smooth'})
    }
    

    // LOADING //
    if (!isLoad) {
        return <div>Loading ...</div>
    }
    

    return (
        <div className="details_global_container">
                <div className="details_sideImg_img_container">
                    <div className="details_side_img_sub_container" ref={sideImagesContainer}>
                        <div className="details_side_img">
                            {product.product_images.map((file, index) => (
                                <div 
                                    key={index}
                                    className={(styleActive && index === imageIndex) || (index === 0 && imageDefault) ? "details_sideImg_img_active" : "details_sideImg_img"}
                                    style={{backgroundImage: `url('http://localhost:8989/uploads/${file.images}')`}} onClick={() => cornerImageDisplay(file.images, index)}>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="details_img_container" style={{backgroundImage: `url('http://localhost:8989/uploads/${nextImageActive ? nexImage : product.image}')`}}>
                        <i class={`fa-solid fa-circle-chevron-up ${imageIndex === product.product_images.length - 1 && 'right_arrow_disabled'}`} id="details_right_arrow" onClick={goImageRight}></i>
                        <i class={`fa-solid fa-circle-chevron-up ${imageIndex === 0 && 'right_arrow_disabled'}`} id="details_left_arrow" onClick={goImageLeft}></i>
                    </div>
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