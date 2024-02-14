import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { productService } from '../../_services/product.service'
import './product.css'
import { AccountService } from '../../_services/account.service'


const Produits = () => {

    // States //
    const [products, setProducts] = useState()
    const [isLoad, setISload] = useState(false) // while false block acces to products state
    const [refNotfound, setRefNotfound] = useState(false)
    

    // Reference // 
    const flag = useRef(false)


    // REDIRECTION //
    const navigate = useNavigate()

    
    // Handle errors
    const handleError = (err) => {
        if (err.response && err.response.status) {
            setRefNotfound(true)
            setProducts(err.response.data.data)
            setISload(true)
        } else {
            console.log('Error:', err.message)
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

    // LOGOUT //
    const logout = () => {

        // Api call for logout
        AccountService.logout()

        // Redirect to login
        navigate("/auth/login")
    }

    
    //Loader 
    if (!isLoad) {
        return <div>Loading...</div>
    }


    return (
        <div className='product_manage_global_container'>
                <div>
                    <input className='product_manage_searchBar' type='text' placeholder='search'/>
                </div>
                <div className='product_manage_addBtn_adminWelcom'>
                    <div className='adminWelcom'>
                        <div className='product_admin_picture'></div>
                        <p>Welcom beystore administrator</p>
                    </div>
                    <Link to="../add_product" title='add product'><button className='product_manage_btn_add_product'>+ add product</button></Link>
                </div>
            <div className='product_manage_container'>
                <table className='product_manage_table_container'>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Note</th>
                        <th>CreatedAt</th>
                        <th>Actions</th>
                    </tr>
                    {!refNotfound ?
                        products.map(product => (
                            <>
                                <tr key={product.id}>
                                    <td className='product_manage_img_container' style={{backgroundImage: `url('http://localhost:8989/uploads/${product.image}')`}}></td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.note}</td>
                                    <td>{product.createdAt}</td>
                                    <td className='product_manage manage_icons'>
                                        <Link to={`../edit_product/${product.id}`}><button className='product_manage_btn_edit' >Edit</button></Link>
                                        <button className='product_manage_btn_delete'  onClick={() => deleteProcut(product.id)}>delete</button>
                                    </td>
                                </tr>
                            </>
                        )) 
                        : <div>{products}</div> 
                    }
                </table>
            </div>
        </div>
    )
}    


export default Produits