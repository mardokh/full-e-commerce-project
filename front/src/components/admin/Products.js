import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productService } from '../../_services/product.service';
import './product.css';
import { AccountService } from '../../_services/account.service';


const Produits = () => {
    const [products, setProducts] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(4);
    const [refNotFound, setRefNotFound] = useState(false);
    const flag = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (flag.current === false) {
            productService.getAllproducts()
                .then(res => {            
                    setProducts(res.data.data);
                    setIsLoad(true);
                })
                .catch(err => handleError(err));
        }
        return () => flag.current = true;
    }, []);

    const handleError = (err) => {
        if (err.response && err.response.status) {
            setRefNotFound(true);
            setProducts(err.response.data.data);
            setIsLoad(true);
        } else {
            console.log('Error:', err.message);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            await productService.deleteProduct(productId);
            const productsGet = await productService.getAllproducts();
            setProducts(productsGet.data.data);
        } catch (err) {
            handleError(err);
        }
    };

    const logout = () => {
        AccountService.logout();
        navigate("/auth/login");
    };

    const indexOfLastProduct = productsPerPage * currentPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (!isLoad) {
        return <div>Loading...</div>;
    }

    return (
        <div className='product_manage_global_container'>
            <div className='product_manage_sub_container'>
                <div className='product_manager_add'><p>+ add product</p></div>
                <div className='product_manage_container'>
                    <table className='product_manage_table_container'>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Note</th>
                                <th>CreatedAt</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!refNotFound ? (
                                currentProducts.map(product => (
                                    <tr key={product.id}>
                                        <td className='product_manage_img_container' style={{backgroundImage: `url('http://localhost:8989/uploads/${product.image}')`}}></td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.note}</td>
                                        <td>{product.createdAt}</td>
                                        <td className='product_manage manage_icons'>
                                            <Link to={`../edit_product/${product.id}`}><button className='product_manage_btn_edit' >Edit</button></Link>
                                            <button className='product_manage_btn_delete'  onClick={() => deleteProduct(product.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No products found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <ul className='pagination'>
                        {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
                            <li key={index} className={currentPage === index + 1 ? 'active' : ''}>
                                <button onClick={() => paginate(index + 1)}>{index + 1}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Produits;
