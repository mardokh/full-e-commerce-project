import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AccountService } from "../../_services/account.service"


const Login = () => {

    // REDIRECTION //
    const navigate = useNavigate()


    // CREDENTIALS //
    const [credentials, setCredentials] = useState({
        identifiant: "",
        password: ""
    })


    // ON INPUT LOGS //
    const inputChange = (name, value) => {
        setCredentials({
            ...credentials,
            [name]: value
        })
    }


    // ON SUBMIT FORM //
    const submitFrom = async (e) => {
        e.preventDefault()

        try {
            // API call for send credentials
            const res = await AccountService.login(credentials)

            // Save token to local storage
            AccountService.saveToken(res.data.access_token)

            // Redirect
            navigate("/admin")


        }
        catch (err) {
            console.error('Error :', err)
        }
    }



    return(
        <div>
            <form onSubmit={submitFrom}>
                <div>
                    <label>Identifiant</label>
                    <input type="text" name="identifiant" onChange={(e) => inputChange(e.target.name, e.target.value)}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" onChange={(e) => inputChange(e.target.name, e.target.value)} />
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
        </div>
    )
}


export default Login