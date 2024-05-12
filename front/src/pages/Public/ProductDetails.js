import React, { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { productService } from "../../_services/product.service"
import "./product_details.css"
import Footer from "../../components/public/Footer"
import ProductsComments from "../../components/public/productsComments"
import CustomLoader from '../../_utils/customeLoader/customLoader'


const ProductDetails = () => {

    // STATES
    const [product, setProduct] = useState([])
    const [isLoad, setISload] = useState(false)
    const [styleActive, setStyleActive] = useState(false)
    const [imageIndex, setImageIndex] = useState(0)
    const [imageDefault, setImageDefault] = useState(true)
    const [nexImage, setNexImage] = useState("")
    const [nextImageActive, setNextImageActive] = useState(false)
    const [commentFormDisp, setCommentFormDisp] = useState(false)


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
            .catch(err => console.error('Error : ', err))
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

    const commentFormDisplay = () => {
        setCommentFormDisp(true)
    }
    

    // LOADING //
    if (!isLoad) {
        return <CustomLoader/>
    }
    

    return (
        <div className="details_global_container">
            {commentFormDisp &&
                <div className="details_comment_form">
                    <ProductsComments />
                </div>
            } 
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
                    <button className="details_shopping_add_btn">Ajouter au panier</button>
                    <p className="details_product_details">Details : {product.details}</p>
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
                    <button className="details_write_reviews_btn" onClick={commentFormDisplay}>laisser un avis & une note</button>
                </div>
            </div>
            <section className="details_reviews_container">
                              
                <div className="details_reviews_item">
                    <div>
                        <p className="details_reviews_name">Uriel habosh</p>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="12px" height="12px"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="12px" height="12px"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="12px" height="12px"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="12px" height="12px"><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="12px" height="12px"><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg>
                        </div>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla rhoncus, odio vitae vehicula pretium, ex eros porta nulla, id pulvinar elit dui non ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec rhoncus turpis turpis, sed pharetra mi imperdiet quis. Aenean egestas velit</p>
                </div>
                <div className="details_reviews_item">
                    <div>
                        <p className="details_reviews_name">Jean mentos</p>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="12px" height="12px"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="12px" height="12px"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="12px" height="12px"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="12px" height="12px"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="12px" height="12px"><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg>
                        </div>
                    </div>
                    <p>Nulla rhoncus, odio vitae vehicula pretium, ex eros porta nulla, id pulvinar elit dui non ipsum. Interdum et malesuada fames ac ante ipsum primis in mauris consequat ultrices. Phasellus consequat magna eget velit tincidunt, sit amet luctus quam consectetur.</p>
                </div>
                <div className="details_reviews_item">
                    <div>
                        <p className="details_reviews_name">Metatron habahir</p>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="12px" height="12px"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="12px" height="12px"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="12px" height="12px"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="12px" height="12px"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="12px" height="12px"><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg>
                        </div>
                    </div>
                    <p>Rhoncus, odio vitae vehicula pretium, ex eros porta nulla, id pulvinar eros porta nulla, id pulvinar elit dui non Interdum et malesuada fames ac ante ipsum primis in mauris consequat elit dui non ipsum. Interdum et malesuada fames ac ante ipsum primis in mauris consequat ultrices. Phasellus consequat magna eget velit tincidunt, sit amet luctus quam consectetur.</p>
                </div>
            </section>
        </div>
    )
   
}


export default ProductDetails