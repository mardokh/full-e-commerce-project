import React, { useContext, useEffect, useRef, useState } from 'react'
import './editProduct.css'
import { productService } from '../../_services/product.service'
import MyContext from '../../_utils/contexts'
import CustomLoader from '../../_utils/customeLoader/customLoader'


const EditProduct = () => {

    // STATES //
    const [product, setProduct] = useState({})
    const [imageUrl, setImageUrl] = useState()
    const [isLoad, setISload] = useState(false)
    const { productsEditId } = useContext(MyContext)
    const { updateProductsEditDisplay } = useContext(MyContext)
    const { updateProductsOnEdit } = useContext(MyContext)


    // REFERENCE //
    const effectFlag = useRef(false)
    const imageFlag = useRef(false)


    // API CALL FOR GET PRODUCT //
    useEffect(() => {

        if (effectFlag.current === false) {
            productService.getOneProduct(productsEditId)
                .then(res => {
                    setProduct(res.data.data)
                    setISload(true)
                })
                .catch(err => console.error('Error : ', err))
        }
        return () => effectFlag.current = true
    }, [])


    // FORM SUBMIT //
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // Create form data
            const formData = new FormData()
            formData.append('name', product.name)
            formData.append('details', product.details)
            formData.append('price', product.price)
            formData.append('image', product.image)
            formData.append('id', productsEditId)

            // Api call for update recipe
            await productService.updateProcut(formData)

            // Update products state
            updateProductsOnEdit(true)

            // Close edit product windows
            updateProductsEditDisplay(false)
        }
        catch (err) {
            console.error('Error: ', err)
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


    // PRODUCT EDIT CLOSE //
    const closeEditProductWindows = () => {
        updateProductsEditDisplay(false)
    }


    // AWAIT LOADER //
    if (!isLoad) {
        return <CustomLoader/>
    }


    return (
        <div className="edit_product_global_container">
            <i class="fa-solid fa-circle-xmark" id='edit_product_close_icon' onClick={closeEditProductWindows}></i>
            <div className="edit_product_image" style={{backgroundImage: `url('${!imageFlag.current ? `http://localhost:8989/uploads/${product.image}` : imageUrl}')`}}></div>
            <form className='edit_product_container' onSubmit={handleSubmit}>
                <div className='edit_product_item'>
                    <label>Name</label>
                    <input type='text' name='name' value={product.name} onChange={(e) => handleInputChange(e.target.name, e.target.value)}/>
                </div>
                <div className='edit_product_item'>
                    <label>Details</label>
                    <textarea name='details' value={product.details} onChange={(e) => handleInputChange(e.target.name, e.target.value)}></textarea>
                </div>
                <div className='edit_product_item'>
                    <label>Price</label>
                    <textarea name='price' value={product.price} onChange={(e) => handleInputChange(e.target.name, e.target.value)}></textarea>
                </div>
                <div className='edit_product_item'>
                    <label>image</label>
                    <input type='file' name='image' onChange={(e) => handleImageChange(e.target.files[0])} />
                </div>
                <div>
                    <input className='btn_new_product_edit' type='submit' value="confirmer"/>
                </div>
            </form>
        </div>
    )
}

export default EditProduct