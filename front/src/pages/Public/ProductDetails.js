import React, { useEffect, useState, useRef, useContext } from "react"
import { useParams } from "react-router-dom"
import { productService } from "../../_services/product.service"
import "./product_details.css"
//import ProductNotes from "../../components/public/productNotes"
//import { productsNotesCommentsService } from "../../_services/productsNotesComments.service"
import ProductsReviews from "../../components/public/ProductsReviews"
import CustomLoader from '../../_utils/customeLoader/customLoader'
//import { productsNotesCommentsService } from "../../_services/productsNotesComments.service"
import MyContext from "../../_utils/contexts"


const ProductDetails = () => {

    // STATES
    const [product, setProduct] = useState([])
    const [isLoad, setISload] = useState(false)
    const [styleActive, setStyleActive] = useState(false)
    const [imageIndex, setImageIndex] = useState(0)
    const [imageDefault, setImageDefault] = useState(true)
    const [nexImage, setNexImage] = useState("")
    const [nextImageActive, setNextImageActive] = useState(false)


    // CONTEXTS //
    const { updateReviewsOnDisplay } = useContext(MyContext)
    const { userHaveComment } = useContext(MyContext)


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
                const productData = res.data.data
                // Add product.image to product.product_images array
                productData.product_images.unshift({ images: productData.image })
                setProduct(productData)
                setISload(true)
                setImageDefault(false)
                setStyleActive(true)
            })
            .catch(err => console.error('Error : ', err))
        }
        return () => flag.current = true
    }, [])


    // DISPLAY SIDE IMAGE TO MAIN //
    const cornerImageDisplay = (image, index) => {
        setImageDefault(false)
        setImageIndex(index)
        setStyleActive(true)
        setNexImage(image)
        setNextImageActive(true)
    }


    // FROM ANIMATION //
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


    // REVIWES FORM HANDLER //
    const dispRviewsForm = () => {
        updateReviewsOnDisplay(true)
    }
    

    // LOADING //
    if (!isLoad) {
        return <CustomLoader/>
    }
    

    return (
        <div className="details_global_container">
            
            <section className="details_parent_container">
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
                    <p className="details_price">{product.price} Da</p>
                    <div className="details_shopping_add_btn">
                        <p>Ajouter au panier</p>
                        <svg class="svg-icon" viewBox="0 0 20 20" width="30px" height="30px" fill="white">
							<path d="M17.638,6.181h-3.844C13.581,4.273,11.963,2.786,10,2.786c-1.962,0-3.581,1.487-3.793,3.395H2.362c-0.233,0-0.424,0.191-0.424,0.424v10.184c0,0.232,0.191,0.424,0.424,0.424h15.276c0.234,0,0.425-0.191,0.425-0.424V6.605C18.062,6.372,17.872,6.181,17.638,6.181 M13.395,9.151c0.234,0,0.425,0.191,0.425,0.424S13.629,10,13.395,10c-0.232,0-0.424-0.191-0.424-0.424S13.162,9.151,13.395,9.151 M10,3.635c1.493,0,2.729,1.109,2.936,2.546H7.064C7.271,4.744,8.506,3.635,10,3.635 M6.605,9.151c0.233,0,0.424,0.191,0.424,0.424S6.838,10,6.605,10c-0.233,0-0.424-0.191-0.424-0.424S6.372,9.151,6.605,9.151 M17.214,16.365H2.786V7.029h3.395v1.347C5.687,8.552,5.332,9.021,5.332,9.575c0,0.703,0.571,1.273,1.273,1.273c0.702,0,1.273-0.57,1.273-1.273c0-0.554-0.354-1.023-0.849-1.199V7.029h5.941v1.347c-0.495,0.176-0.849,0.645-0.849,1.199c0,0.703,0.57,1.273,1.272,1.273s1.273-0.57,1.273-1.273c0-0.554-0.354-1.023-0.849-1.199V7.029h3.395V16.365z"></path>
						</svg>
                    </div>
                    <p className="details_product_details">{product.details}</p>
                </div>
            </section>
            <div className="details_line_between_products_comments"></div>
            <div className="details_comments_write_reviews_button_global_container">
                <div className="details_comments_write_reviews_button_parent_container">
                    <h1 className="details_comments_title">details du produit</h1>
                </div>
            </div>
            <section className="details_product_details_global_container">
                <div className="details_product_details_parent_container">
                    <p>{product.details} To start the day right, Jardin BiO étic has selected this delicious muesli made with no added sugar, a blend of 4 seeds (linseed, sunflower, sesame and pumpkin) and tasty fruits (raisins and figs).

                    High in fibre and minerals and a source of omega-3, this muesli is both delicious and nutritiou
                    Cereal flakes* 67% (rye*, wheat*, barley*, oat*, corn*), seeds* 21% (linseed*, sunflower*, buckwheat*, sesame*, pumpkin*), raisins* 12% (raisins*, sunflower oil*).

                    *Products from organic agriculture.

                    May contain traces of soy and nuts.
                    </p>
                </div>
            </section>
            <div className="details_line_between_products_comments"></div>
            <div className="details_comments_write_reviews_button_global_container">
                <div className="details_comments_write_reviews_button_parent_container">
                    <h1 className="details_comments_title">commentaires & notes</h1>
                    {!userHaveComment &&
                        <button className="details_write_reviews_btn" onClick={dispRviewsForm}>laisser un avis & une note</button>
                    }
                </div>
            </div>
            <ProductsReviews productId={id}/>
        </div>
    )
   
}


export default ProductDetails