import React, { useState } from "react"
import "./user_inscription.css"
import { UserService } from "../../_services/user.service"


const UserInscription = () => {

    // STATE //
    const [credentials, setCredentials] = useState({})
    const [successInscription, setSuccessInscription] = useState("")
    const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false)


    // GET INPUTS //
    const inputChange = (name, value) => {
        setCredentials({
            ...credentials,
            [name]: value
        })
    }


    // SUBMIT FORM //
    const submitForm = async (e) => {
        e.preventDefault()

        try {
            // Api call for send credentials
            const res = await UserService.userAdd(credentials)

            // Get success message
            setSuccessInscription(res.data.message)

            // Display success message
            setDisplaySuccessMessage(true)

        }
        catch (err) {
            console.error('Error :',err)
        }
    }



    return (
        <div className="user_inscription_form_global_container">
            <form className="user_inscription_form_container" onSubmit={submitForm}>
                <div className="user_inscription_inputs">
                    <input type="text" name="lastName" placeholder="Nom" onChange={(e) => inputChange(e.target.name ,e.target.value)}/>
                </div>
                <div className="user_inscription_inputs">
                    <input type="text" name="firstName" placeholder="Prenom" onChange={(e) => inputChange(e.target.name ,e.target.value)}/>
                </div>
                <div className="user_inscription_inputs">
                    <input type="email" name="email" placeholder="Email" onChange={(e) => inputChange(e.target.name ,e.target.value)}/>
                </div>
                <div className="user_inscription_inputs">
                    <input type="password" name="password" placeholder="Mot de passe" onChange={(e) => inputChange(e.target.name ,e.target.value)}/>
                </div>
                <div className="user_inscription_inputs user_inscription_submit_btn">
                    <input type="submit" value="inscription" />
                </div>
                {displaySuccessMessage &&
                    <div>{successInscription}</div>
                }
            </form>
        </div>
    )
}


export default UserInscription