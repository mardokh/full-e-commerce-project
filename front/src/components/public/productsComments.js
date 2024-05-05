import React from "react"
import "./products_comments.css"


const ProductsComments = () => {

    return (
        <div className="details_comments_global_container">
            <section className="details_comments_container">
                <form className="details_form_container">
                    <div className="details_form_your_comment">
                        <label>Votre commentaire</label>
                        <textarea></textarea>
                    </div>
                    <div className="details_form_button_send">
                        <button>envoyer</button>
                    </div>
                </form>
            </section>
        </div>
    )
}


export default ProductsComments