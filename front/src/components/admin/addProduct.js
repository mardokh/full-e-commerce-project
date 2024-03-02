import React, {useState, useRef, useContext} from 'react'
import './addProduct.css'
import { productService } from '../../_services/product.service'
import MyContext from '../../_utils/contexts'
const AddImage = require('../../images/AddImage.jpg')



const AddProduct = () => {

    // STATES //
    const [product, setProduct] = useState({name: "", price: "", details: "", image: ""})
    const [imageUrl, setImageUrl] = useState()
    const { updateProductsAddDisplay } = useContext(MyContext)
    const { updateProductsOnAdd } = useContext(MyContext)


    // REFERENCE //
    const imageFlag = useRef(false)


    // FORM SUBMIT //
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('name', product.name)
            formData.append('price', product.price)
            formData.append('details', product.details)
            formData.append('image', product.image)

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

    
    // PRODUCT ADD CLOSE //
    const closeAddProductWindows = () => {
        updateProductsAddDisplay(false)
    }


    return (
        <div className="add_product_global_container">
            <i class="fa-solid fa-circle-xmark" id='add_product_close_icon' onClick={closeAddProductWindows}></i>
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
                    <label>image</label>
                    <input type='file' name='image' onChange={(e) => handleImageChange(e.target.files[0])} />
                </div>
                <div>
                    <input className='btn_new_product_add' type='submit' value="confirmer"/>
                </div>
            </form>
        </div>
    )
}

export default AddProduct