import React, { useEffect, useState, useContext, useRef } from "react"
import { Link } from "react-router-dom"
import "./productsReviews.css"
import { productsNotesCommentsService } from "../../_services/productsNotesComments.service"
import Cookies from 'js-cookie'
import CustomLoader from '../../_utils/customeLoader/customLoader'
import MyContext from "../../_utils/contexts"
import { UserService } from "../../_services/user.service"



const ProductsReviews = ({ productId }) => {


    // STATES //
    const [isLoad, setISload] = useState(false)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const [reviewData, setReviewData] = useState([])
    const [reviewNoteFoundMessage, setReviewNoteFoundMessage] = useState("")
    const [userConnected, setUserConnected] = useState(false)
    const [user, setUser] = useState({})
    const [commentEdit, setCommentEdit] = useState(false)
    const [editCommentId, setEditCommentId] = useState(null); // New state to track the comment being edited
    const [submitLoader, setSubmitLoader] = useState(false)


    // CONTEXTS //
    const { reviewsOnDisplay, updateReviewsOnDisplay, updateUserHaveComment } = useContext(MyContext)


    // GET LOGIN COOKIE //
    const user_id = Cookies.get('userId')


    // REFERENCES //
    const parentNodeRef = useRef(null)


    // REVIEWS FORM SUBMIT //
    const submitForm = async (e) => {
        e.preventDefault()
        setSubmitLoader(true)

        try {
            // Create a new review object
            const newReview = {
                user_name: user.firstName + " " + user.lastName,
                user_id: user_id,
                product_id: productId,
                note: rating,
                comment: comment
            };

            // Send form to endPoint
            await productsNotesCommentsService.addProductsNotesComments(newReview)

            // Reset form fields
            setRating(0)
            setComment("")

            getCommentsNotes()

            // Close component
            updateReviewsOnDisplay(false)

            // Set loader
            setSubmitLoader(true)

        } catch (err) {
            console.error('Error', err)
        }
    }


    // REVIEWS EDIT FORM SUBMIT //
    const submitEditForm = async (e) => {
        e.preventDefault()
        setSubmitLoader(true)
        
        try {
            // Create a new review object
            const newReview = {
                user_id: user_id,
                note: rating,
                comment: comment
            }

            // Send form to endPoint
            await productsNotesCommentsService.updateProductsNotesComments(newReview)

            // Reset form fields
            setRating(0)
            setComment("")
            setEditCommentId(null) // Reset edit comment ID

            getCommentsNotes()

            // Close component
            updateReviewsOnDisplay(false)

        } catch (err) {
            console.error('Error', err)
        }
    }


    // GET REVIEWS ERRORS HANDLING //
    const handleError = (err) => {
        if (err.response && err.response.status === 404) {
            setReviewNoteFoundMessage(err.response.data.message)
            setISload(true)
        } else {
            console.log('Error:', err.message)
        }
    }


    // CHECK USER TOKEN / GET USER DATA //
    useEffect(() => {
        const getUserData = async () => {
            try {
                // Check if login cookie exist
                if (user_id) {
                    // Check token validity
                    const res = await UserService.isLogged()

                    // Get user
                    if (res === true) {
                        const userData = await UserService.getUser(user_id)

                        // Update state
                        setUser(userData.data.data)

                        // Update user connecting status
                        setUserConnected(true)
                    }
                }
            } catch (err) {
                console.error('getUserData Error :', err)
            }
        };
        getUserData()
    }, [])


    const getCommentsNotes = async () => {
        try {
            // Get all comments
            const res = await productsNotesCommentsService.getProductsNotesComments(productId)

            const reviews = res.data.data

            // Update state
            setReviewData(reviews.map(item => ({
                id: item.id,
                user_name: item.products_notes_comments.firstName + " " + item.products_notes_comments.lastName,
                user_id: item.user_id,
                product_id: item.product_id,
                note: item.note,
                comment: item.comment
            })));

            // Set loader
            setISload(true)
            
        } 
        catch (err) {
            handleError(err)
        }
    }


    // GET ALL REVIEWS //
    useEffect(() => {
        getCommentsNotes()
    }, [])
    

    // CHECK IF USER HAVE COMMENT //
    useEffect(() => {
        const checkUserComment = () => {
            try {
                if (reviewData.some(item => item.user_id == user_id)) {
                    updateUserHaveComment(true)
                } else {
                    updateUserHaveComment(false)
                }
            } catch (err) {
                console.error('checkUserComment Error : ', err)
            }
        };
        checkUserComment()
    }, [reviewData, userConnected])


    // COMMENT INPUT HANDLING //
    const inputChange = (comment) => {
        setComment(comment)
    }


    // RATING INPUT HANDLING //
    const handleStarClick = (index) => {
        setRating(index + 1)
    }


    // DELETE REVIEW HANDLING //
    const deleteReview = async (id) => {
        try {
            // Delete review from the server
            await productsNotesCommentsService.deleteProductsNotesComments(id)

            // Remove the review from the state
            setReviewData(prevReviewData => prevReviewData.filter(review => review.id !== id))
        } catch (err) {
            console.error('deleteReview Error:', err)
        }
    }


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (parentNodeRef.current && !parentNodeRef.current.contains(event.target)) {
                console.log('in handleClickOutside')
                updateReviewsOnDisplay(false)
            }
        };

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [updateReviewsOnDisplay])


    // COMMENT EDIT HANDLING //
    const editComment = (commentId, commentText, commentRating) => {
        setCommentEdit(true)
        setEditCommentId(commentId) // Set the comment being edited
        setComment(commentText) // Initialize the comment state with the current comment
        setRating(commentRating) // Initialize the rating state with the current rating
        updateReviewsOnDisplay(true)
    };


    // LOADER //
    if (!isLoad) {
        return <CustomLoader />
    }


    return (
        <div>
            {reviewsOnDisplay &&
                <section className="details_comment_and_notes_global_container">
                    <div className="details_comment_and_notes_parent_container" ref={parentNodeRef}>
                        {submitLoader ?
                            <CustomLoader />
                        :    
                        <div>
                            {userConnected && !commentEdit ?
                                <div className="details_comment_and_notes_container">
                                    <div className="details_comment_and_notes_sub_container">
                                        <div className="details_comments_global_container">
                                            <section className="details_comments_container">
                                                <form className="details_form_container" onSubmit={submitForm}>
                                                    <div className="details_rating_container">
                                                        <p>Laisser une note pour ce produit</p>
                                                        <div className="details_rating_star_container">
                                                            {[...Array(5)].map((_, index) => (
                                                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" key={index} className={index < rating ? "details_rating_star details_rating_filled" : "details_rating_star"} onClick={() => handleStarClick(index)}>
                                                                    <polygon points="12,2 15,8.5 22,9 17,13.5 18.5,21 12,17 5.5,21 7,13.5 2,9 9,8.5" />
                                                                </svg>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="details_form_your_comment">
                                                        <label>Votre commentaire</label>
                                                        <textarea onChange={(e) => inputChange(e.target.value)} value={comment}></textarea>
                                                    </div>
                                                    <div className="details_form_button_send">
                                                        <input type="submit" value="Poster" />
                                                    </div>
                                                </form>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                                : commentEdit ?
                                    <div className="details_comment_and_notes_container">
                                        {reviewData.map(item => {
                                            if (item.user_id == user_id && item.id === editCommentId) {
                                                return (
                                                    <div className="details_comment_and_notes_container" key={item.id}>
                                                        <div className="details_comment_and_notes_sub_container">
                                                            <div className="details_comments_global_container">
                                                                <section className="details_comments_container">
                                                                    <form className="details_form_container" onSubmit={submitEditForm}>
                                                                        <div className="details_rating_container">
                                                                            <div className="details_rating_star_container">
                                                                                {[...Array(5)].map((_, index) => (
                                                                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" key={index} className={index < rating ? "details_rating_star details_rating_filled" : "details_rating_star"} onClick={() => handleStarClick(index)}>
                                                                                        <polygon points="12,2 15,8.5 22,9 17,13.5 18.5,21 12,17 5.5,21 7,13.5 2,9 9,8.5" />
                                                                                    </svg>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                        <div className="details_form_your_comment">
                                                                            <label>Votre commentaire</label>
                                                                            <textarea onChange={(e) => inputChange(e.target.value)} value={comment}></textarea>
                                                                        </div>
                                                                        <div className="details_form_button_send">
                                                                            <input type="submit" value="Poster" />
                                                                        </div>
                                                                    </form>
                                                                </section>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        })}
                                    </div>
                                    :
                                    <div className="details_form_not_connected_container">
                                        <p>Veuillez vous <Link to="/login_inscription/main/connexion">connecter</Link> ou vous <Link to="/login_inscription/main/connexion">inscrire</Link> pour laisser votre avis</p>
                                    </div>
                            }
                        </div>
                        }
                    </div>
                </section>
            }
            <section className="details_reviews_container">
                {reviewData.length > 0 ?
                    (
                        <div>
                            {reviewData.map(item => (
                                <div className="details_reviews_item" key={item.id}>
                                    <div className="details_reviews_item_sub_container">
                                        <div>
                                            <p className="details_reviews_name">{item.user_name}</p>
                                            <div>
                                                {[...Array(5)].map((_, index) => (
                                                    <svg
                                                        key={index}
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className={item.note >= index + 1 ? "details_rating_star_enable" : "details_rating_star_disable"}
                                                    >
                                                        <polygon points="12,2 15,8.5 22,9 17,13.5 18.5,21 12,17 5.5,21 7,13.5 2,9 9,8.5" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                        <p>{item.comment}</p>
                                    </div>
                                    {item.user_id == user_id &&
                                        <div className="details_reviews_icons_container">
                                            <svg className="details_reviews_icon" viewBox="0 0 20 20" onClick={() => editComment(item.id, item.comment, item.note)}>
                                                <path d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z"></path>
                                            </svg>
                                            <svg className="details_reviews_icon" viewBox="0 0 20 20" onClick={() => deleteReview(item.id)}>
                                                <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
                                            </svg>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>
                    )
                    : (<p>{reviewNoteFoundMessage}</p>)
                }
            </section>
        </div>
    );
};

export default ProductsReviews