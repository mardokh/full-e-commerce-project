// IMPORT MODULES //
import Axios from "./caller.service"


let getAllproducts = () => {
    return Axios.get('/products')
}

let getOneProduct = (productId) => {
    return Axios.get('/products/'+productId)
}

let addProduct = (product) => {
    return Axios.put('/products/add', product)
}

let deleteProduct = (productId) => {
    return Axios.delete('/products/delete/'+productId)
}



// EXPORTS //
export const productService = { 
    getAllproducts, getOneProduct, addProduct, deleteProduct 
}