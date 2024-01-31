// MODULES IMPORTS //
import React, {useContext, useState} from "react"
import "./products_notes.css"
import MyContext from "../../_utils/contexts"
import { productNoteService } from "../../_services/productNote.service"


const ProductNotes = () => {

    // STATES //
    const { productsNotesId } = useContext(MyContext)
    const { updateProductsNotesDisplay } = useContext(MyContext)
    const [note, setNote] = useState(1)


    // SUBMIT FORM //
    const subNotesFrom = (e) => {
        e.preventDefault()

        try {
            const formData = new FormData()
            formData.append('id', productsNotesId)
            formData.append('note', note)

            console.log(formData.get('id'))
            console.log(formData.get('note'))

            // Api call
            productNoteService.productNotesAdd(formData)
                .then(res => {
                    // console.log(res)
                    updateProductsNotesDisplay(false)
                })
                .catch(err => console.error('Error: ', err))

        }
        catch (err) {
            console.error('Error :', err)
        }
    }

    // HANDLE INPUTS //
    const handlInputChange = (value) => {
        setNote(value)
    }

    // CLOSE NOTE FROM //
    const closeNoteForm = () => {
        updateProductsNotesDisplay(false)
    }



    return (
        <div className="products_notes_container">
            <i class="fa-solid fa-rectangle-xmark" onClick={closeNoteForm}></i>
            <form className="products_notes_form_container" onSubmit={subNotesFrom}>
                <label>Note sur /5</label>
                <div>
                    <i className="fa-solid fa-star" style={{color: 'gold'}}></i>
                    <i className="fa-solid fa-star" style={{color: 'gold'}}></i>
                    <i className="fa-solid fa-star" style={{color: 'gold'}}></i>
                    <i className="fa-solid fa-star" style={{color: 'gold'}}></i>
                    <i className="fa-solid fa-star" style={{color: 'gold'}}></i>
                </div>
                <input className="input_product_notes" type="number" name="note" max="5" min="1" onChange={(e) => handlInputChange(e.target.value)}/>
                <input className='btn_products_notes' type='submit' value="soumettre"/>
            </form>
        </div>
    )
}



// MODULES EXPORTS //
export default ProductNotes