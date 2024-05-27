/*
import React, { useState } from "react"
import "./ProductsNotesComments.css"
import { productsNotesCommentsService } from "../../_services/productsNotesComments.service"


const ProductsNotesComments = () => {

    // STATES //
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")


    // FORM SUBMIT //
    const submitForm = async () => {
        e.preventDefault()

        try {
            const formData = new FormData()
            // formData.append('user_id', user_id from parent)
            // formData.append('product_id', product_id from parent)
            formData.append('note', rating)
            formData.append('comment', comment)

            const res = await productsNotesCommentsService.productsNotesComments(formData)

        }
        catch (err) {
            console.error('Error', err)
        }
    }


    // COMMENT HANDLING //
    const inputChange = (comment) => {
        setComment(comment)
    }
    

    // RATING HANDLER //
    const handleStarClick = (index) => {
        setRating(index + 1)
    }


    return (
        <div className="details_comments_global_container">
            <section className="details_comments_container">
                <form className="details_form_container" onSubmit={submitForm}>
                    <div className="details_rating_container">
                        <p>Laisser une note pour ce produit</p>
                        <div className="details_rating_star_container">
                            {[...Array(5)].map((_, index) => (
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" key={index} className={index < rating ? "details_rating_star details_rating_filled" : "details_rating_star"} onClick={() => handleStarClick(index)}>
                                    <polygon points="12,2 15,8.5 22,9 17,13.5 18.5,21 12,17 5.5,21 7,13.5 2,9 9,8.5"/>
                               </svg>
                            ))}
                        </div>
                    </div>
                    <div className="details_form_your_comment">
                        <label>Votre commentaire</label>
                        <textarea onChange={(e) => inputChange(e.target)}></textarea>
                    </div>
                    <div className="details_form_button_send">
                        <button>Poster</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

// key={index} className={index < rating ? "details_rating_star details_rating_filled" : "details_rating_star"} onClick={() => handleStarClick(index)}

export default ProductsNotesComments
*/