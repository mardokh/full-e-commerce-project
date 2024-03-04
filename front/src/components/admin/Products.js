import React, { useEffect, useRef, useState, useMemo, useContext } from 'react';
import { productService } from '../../_services/product.service';
import Pagination from '../../pagination/Pagination';
import './product.css';
import MyContext from '../../_utils/contexts'
import CustomLoader from '../../_utils/customeLoader/customLoader'

const Produits = () => {

    // STATES / CONTEXTS / CONST
    const [products, setProducts] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const [refNotFound, setRefNotFound] = useState(false);
    const flag = useRef(false);
    const [currentPage, setCurrentPage] = useState(1);
    const { updateProductsAddDisplay } = useContext(MyContext)
    const { productsOnAdd } = useContext(MyContext)
    const { productsOnEdit } = useContext(MyContext)
    const { updateProductsEditDisplay } = useContext(MyContext)
    const { updateProductsEditId } = useContext(MyContext)
    let PageSize = 4;


    // MAIN LOAD PRODUCTS //
    const loadProducts = () => {
        if (flag.current === false) {
            productService.getAllproducts()
                .then(res => {            
                    setProducts(res.data.data);
                    setRefNotFound(false)
                    setIsLoad(true);
                })
                .catch(err => handleError(err));
        }
        return () => flag.current = true;
    }

    
    // LOAD PRODUCTS ON PAGE LOAD //
    useEffect(() => {
        loadProducts()
    },[])


    // LOAD RECIPES ON PRODUCT ADD //
    if (productsOnAdd || productsOnEdit) {
        loadProducts()
    }


    // LOAD PRODUCTS ERRORS HANDLE //
    const handleError = (err) => {
        if (err.response && err.response.status) {
            setRefNotFound(true);
            setProducts(err.response.data.data);
            setIsLoad(true);
        } else {
            console.log('Error:', err.message);
        }
    };


    // DELETE AN PRODUCT //
    const deleteProduct = async (productId) => {
        try {
            await productService.deleteProduct(productId);
            const productsGet = await productService.getAllproducts();
            setProducts(productsGet.data.data);
        } catch (err) {
            handleError(err);
        }
    };
    

    // PAGINATION HANDLE 
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return products.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, products]);


    useEffect(() => {
        if (currentTableData.length === 0 && currentPage > 1) {
            const curpage = currentPage
            setCurrentPage(curpage - 1)
        }
    })


    // ADD PRODUCT PAGE DISPLAYER //
    const displayProductAddForm = () => {
        updateProductsAddDisplay(true)
    }


    // EDIT PRODUCT PAGE DISPLAYER //
    const displayProductEditForm = (productId) => {
        updateProductsEditDisplay(true)
        updateProductsEditId(productId)
    }
    

    // AWAIT LOADER //
    if (!isLoad) {
        return <CustomLoader/>
    }


    // RENDERING //
    return (
        <div className='product_manage_global_container'>
            <div className='product_manage_sub_container'>
                <div className='product_manager_add' onClick={displayProductAddForm} title='add product'><i class="fa-solid fa-plus" id='product_manage_add_icon'></i></div>
                <div className='product_manage_container'>
                    <table className='product_manage_table_container'>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Note</th>
                                <th>Favorites</th>
                                <th>CreatedAt</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!refNotFound ? (
                                currentTableData.map(product => (
                                    <tr key={product.id}>
                                        <td className='product_manage_img_container' style={{backgroundImage: `url('http://localhost:8989/uploads/${product.image}')`}}></td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.note}</td>
                                        <td>{product.favprd}</td>
                                        <td>{product.createdAt}</td>
                                        <td className='product_manage manage_icons'>
                                            <button className='product_manage_btn_edit' onClick={() => displayProductEditForm(product.id)}>Edit</button>
                                            <button className='product_manage_btn_delete'  onClick={() => deleteProduct(product.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">No products found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Pagination
                        className="pagination-bar"
                        currentTableData={currentTableData}
                        currentPage={currentPage}
                        totalCount={products.length}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Produits;
