// MODULES IMPORTS //
import React, {useContext, useState} from "react"
import "./products_notes.css"
import MyContext from "../../_utils/contexts"
import { productNoteService } from "../../_services/productNote.service"


const ProductNotes = () => {

    // STATES //
    const { productsNotesId } = useContext(MyContext)
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
                    console.log(res)
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


    return (
        <div>
            <form className="products_notes_container" onSubmit={subNotesFrom}>
                <div>
                    <label>Note sur /5</label>
                    <input type="number" name="note" onChange={(e) => handlInputChange(e.target.value)}/>
                </div>
                <div>
                    <input className='btn_products_notes' type='submit' value="soumettre"/>
                </div>
            </form>
        </div>
    )
}



// MODULES EXPORTS //
export default ProductNotes