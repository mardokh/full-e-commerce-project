// MODULES IMPORTS //
import Axios from "./caller.service"


// GET ALL REVIEWS //
let getProductsNotesComments = (productId) => {
    return Axios.get(`/review?productId=${productId}`)
}

// ADD REVIEW //
let addProductsNotesComments = (prodNote) => {
    return Axios.put('/review/add', prodNote)
}

// DELETE REVIEW //
let deleteProductsNotesComments = (productId) => {
    return Axios.delete('/review/delete/'+productId)
}


// EXPORTS //
export const productsNotesCommentsService = {
    addProductsNotesComments, getProductsNotesComments, deleteProductsNotesComments
}