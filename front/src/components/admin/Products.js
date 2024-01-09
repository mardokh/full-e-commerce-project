import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { productService } from '../../_services/product.service'
import './product.css'


const Produits = () => {

    // States //
    const [products, setProducts] = useState()
    const [isLoad, setISload] = useState(false) // while false block acces to products state
    const [refNotfound, setRefNotfound] = useState(false)
    

    // Reference // 
    const flag = useRef(false)

    
    // Handle errors
    const handleError = (err) => {
        if (err.response && err.response.status) {
            setRefNotfound(true);
            setProducts(err.response.data.data);
            setISload(true);
        } else {
            console.log('Error:', err.message);
        }
    }


    // Get all products //
    useEffect(() => {
        if (flag.current === false) {
            productService.getAllproducts()
                .then(res => {            
                    setProducts(res.data.data)
                    setISload(true)  // when true allow access to products state  
                })
                .catch(err => handleError(err))
        }
        return () => flag.current = true
    }, [])


    // DELETE PRODUCT //
    const deleteProcut = async (productId) => {

        try {
            // Api call for delete product
            await productService.deleteProduct(productId)

            // Api call for get all products
            const productsGet = await productService.getAllproducts()

            // Update state
            setProducts(productsGet.data.data)
        }
        catch (err) {
            handleError(err)
        }
    }

    
    //Loader 
    if (!isLoad) {
        return <div>Loading...</div>
    }


    return (
        <div className='product_manage_global_container' title='ajouter un produit'>
            <Link to="../add_product"><div className='icon_add_product'><i class="fa-solid fa-plus"></i></div></Link>
            {!refNotfound ?
                products.map(product => (
                    <div key={product.id} className='product_manage_container'>
                        <div className='product_manage manage_name'>
                            <p className='p_title'>Nom du produit</p>
                            <p className='p_name'>{product.name}</p>
                        </div>
                        <div className='product_manage manage_price'>
                            <p className='p_title'>Prix</p>
                            <p className='p_price'>{product.price}</p>
                        </div>
                        <div className='product_manage manage_note'>
                            <p className='p_title'>Note d'evalution</p>
                            <p className='p_note'>{product.note}</p>
                        </div>
                        <div className='product_manage manage_date'>
                            <p className='p_title'>Date de creation</p>
                            <p className='p_createdAt'>{product.createdAt}</p>
                        </div>
                        <div className='product_manage manage_icons'>
                            <Link to={`../edit_product/${product.id}`}><i class="fa-solid fa-pen-to-square"></i></Link>
                            <i onClick={() => deleteProcut(product.id)} class="fa-solid fa-trash"></i>
                        </div>
                    </div>
                )) : <div>{products}</div> 
            }
        </div>

    )
}    


export default Produits