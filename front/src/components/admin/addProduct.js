import React, {useState} from 'react'
import './addProduct.css'
import { productService } from '../../_services/product.service'
import { useNavigate } from 'react-router-dom'


const AddProduct = () => {


    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        image: null 
    })

    // GLOBAL VARIABLES //
    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('name', product.name)
            formData.append('price', product.price)
            formData.append('details', product.description)
            formData.append('image', product.image)

            /*  Debug 
            console.log('Name:', formData.get('name'));
	        console.log('Price:', formData.get('price'));
	        console.log('Details:', formData.get('details'));
	        console.log('Image:', formData.get('image'));
            */

            // Api call for add product
            await productService.addProduct(formData)

            // Rediretion
            navigate('../products_manage')
        }
        catch (error) {
            console.error('Error : ', error)
        }
    }


    // Update inputs state
    const handleInputChange = (name, value) => {
        setProduct({
            ...product,
            [name]: value
        })
    }


    // Update image state
    const handleImageChange = (image) => {
        setProduct({
            ...product,
            image: image
        })
    }


    return (
        <div>
            <form className='add_product_container' onSubmit={handleSubmit}>
                <div className='add_product_item'>
                    <label>Name</label>
                    <input type='text' name='name' onChange={(e) => handleInputChange(e.target.name, e.target.value)}/>
                </div>
                <div className='add_product_item'>
                    <label>Price</label>
                    <input type='number' name='price' onChange={(e) => handleInputChange(e.target.name, e.target.value)}/>
                </div>
                <div className='add_product_item'>
                    <label>Description</label>
                    <textarea name='description' onChange={(e) => handleInputChange(e.target.name, e.target.value)}></textarea>
                </div>
                <div className='add_product_item'>
                    <label>image</label>
                    <input type='file' name='image' onChange={(e) => handleImageChange(e.target.files[0])}/>
                </div>
                <div>
                    <input className='btn_new_product_add' type='submit' value="Ajouter le produit"/>
                </div>
            </form>
        </div>
    )
}

export default AddProduct
