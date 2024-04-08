// MODULES IMPORTS //
import React, {useState, useRef, useContext, useEffect} from 'react'
import './addProduct.css'
import { productService } from '../../_services/product.service'
import MyContext from '../../_utils/contexts'
import CustomLoader from '../../_utils/customeLoader/customLoader'
const AddImage = require('../../images/AddImage.jpg')


// MAIN FUNCTION
const AddProduct = () => {

    // STATES //
    const [product, setProduct] = useState({name: "", price: "", details: "", image: "", images: []})
    const [imageUrl, setImageUrl] = useState()
    const [loader, setLoader] = useState(false)
    const { updateProductsAddDisplay } = useContext(MyContext)
    const { updateProductsOnAdd } = useContext(MyContext)


    // REFERENCES //
    const imageFlag = useRef(false)
    const imagesDisplayContainerRef = useRef()


    // IMAGES CONTAINER SCROLL //
    const scrollToRightEnd = () => {
        imagesDisplayContainerRef.current.scrollTo({left: imagesDisplayContainerRef.current.scrollWidth, behavior: 'smooth'})
    }
    useEffect(() => {
        scrollToRightEnd()
    }, [product])
    
    
    // FORM SUBMIT //
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Load data
            setLoader(true)

            const formData = new FormData()
            formData.append('name', product.name)
            formData.append('price', product.price)
            formData.append('details', product.details)
            formData.append('image', product.image)
            for (const file of product.images) {
                formData.append('images', file);
            }

            /*
            console.log(formData.getAll('images'))

            for (const pair of formData.entries()) {
                console.log(pair[0], pair[1])

            product.images.forEach(file => {
                console.log(file)
            })
            */

            // Api call for add product
            await productService.addProduct(formData)

            // Update products state
            updateProductsOnAdd(true)

            // Close add product windows
            updateProductsAddDisplay(false)

        }
        catch (error) {
            console.error('Error : ', error)
        }
    }


    // UPDATE INPUTS STATE //
    const handleInputChange = (name, value) => {
        setProduct({
            ...product,
            [name]: value
        })
    }


    // UPDATE IMAGE STATE //
    const handleImageChange = (image) => {
        
        setProduct({
            ...product,
            image: image
        })

        if (image) {
            const urlImage = URL.createObjectURL(image)
            setImageUrl(urlImage)
            imageFlag.current = true
        }
    }


    // UPDATE IMAGES STATE //
    const handleImagesChange = (e) => {
        const newImages = Array.from(e.target.files).map(image => image)
        setProduct(prevProduct => ({
            ...prevProduct,
            images: [...prevProduct.images, ...newImages]
        }))
    }

    
    // PRODUCT ADD CLOSE //
    const closeAddProductWindows = () => {
        updateProductsAddDisplay(false)
    }


    // IMAGES ITEM DELETE //
    const deleteImage = (index) => {
        setProduct(prevImages => {
            const updatedImages = [...prevImages.images]
            updatedImages.splice(index, 1)
            return { ...prevImages, images: updatedImages }
        })
    }


    // MAIN RENDERING //
    return (
        <div className="add_product_global_container">
            <i class="fa-solid fa-circle-xmark" id='add_product_close_icon' onClick={closeAddProductWindows}></i>
            {loader ?
            <div className='add_product_loader_spin'>
                <CustomLoader />
            </div>
            :
            <>
                <div className='add_product_form_image_container'>
                    <div className="add_product_image" style={{backgroundImage: `url('${!imageFlag.current ? AddImage : imageUrl}')`,}}></div>
                    <form className='add_product_container' onSubmit={handleSubmit}>
                        <div className='add_product_item'>
                            <label>Name</label>
                            <input type='text' name='name' value={product.name} onChange={(e) => handleInputChange(e.target.name, e.target.value)}/>
                        </div>
                        <div className='add_product_item'>
                            <label>Details</label>
                            <textarea name='details' value={product.details} onChange={(e) => handleInputChange(e.target.name, e.target.value)}></textarea>
                        </div>
                        <div className='add_product_item'>
                            <label>Price</label>
                            <input type='number' name='price' value={product.price} onChange={(e) => handleInputChange(e.target.name, e.target.value)}></input>
                        </div>
                        <div className='add_product_item add_product_img_input'>
                            <label>image principale</label>
                            <input type='file' name='image' onChange={(e) => handleImageChange(e.target.files[0])} />
                        </div>
                        <div className='add_product_item add_product_imgs_input'>
                            <label>autres images</label>
                            <input type="file" name="images[]" onChange={handleImagesChange} multiple /> 
                        </div>
                        <div>
                            <input className='btn_new_product_add' type='submit' value="confirmer"/>
                        </div>
                    </form>
                </div>
                <div className="images_display_container" ref={imagesDisplayContainerRef}>
                    {product.images.map((image, index) => (
                        <div className="add_product_images_container" key={index}>
                            <i class="fa-solid fa-circle-xmark" id='add_product_images_close_icon' onClick={() => deleteImage(index)}></i>
                            <div className="add_product_images" style={{backgroundImage: `url('${URL.createObjectURL(image)}')`}}></div>
                        </div>
                    ))}
                </div>

            </>
            }
        </div>
    )
}


// MODULE EXPORT //
export default AddProduct