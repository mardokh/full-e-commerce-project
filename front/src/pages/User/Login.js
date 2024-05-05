import React, { useState } from "react"
import "./login.css"
import { UserService } from "../../_services/user.service"
import BouncingDotsLoader from "../../_utils/customeLoader/dotsLoader"
import { useNavigate } from "react-router-dom"


const Login = () => {

    // STATE //
    const [credentials, setCredentials] = useState({})
    const [loader, setLoader] = useState(false)
    const [loginFailed, setLoginFailed] = useState("")
    const [loginFailedDisplay, setLoginFailedDisplay] = useState(false)


    // REDIRECTION //
    const navigate = useNavigate()


    // ON LOGS INPUT //
    const inputChange = (name, value) => {
        setCredentials({
            ...credentials,
            [name]: value
        })
    }


    // Handle errors
    const handleError = (err) => {
        if (err.response && err.response.status === 401) {
            setLoginFailed(err.response.message)
            setLoginFailedDisplay(true)
        } else {
            console.log('Error:', err.message)
        }
    }


    // ON FORM SUBMIT //
    const submitFrom = async (e) => {
        e.preventDefault()

        try {
            // Api call for send credentials
            const res = await UserService.userLogin(credentials)

            // Save token to local storage
            UserService.saveToken(res.data.access_token)

            // Redirect
            navigate(`/user/account/${res.data.user_id}`)
        }

        catch (err) {
            handleError(err)
        }
    }



    return (
        <div className="user_connection_form_container">
            <form className="user_connection_form" onSubmit={submitFrom}>
                <div className="user_connection_input_container">
                    <input type="email" name="identifiant" placeholder="votre adresse email" onChange={(e) => inputChange(e.target.name, e.target.value)} />
                </div>
                <div className="user_connection_input_container">
                    <input type="password" name="password" placeholder="mot de passe" onChange={(e) => inputChange(e.target.name, e.target.value)} />
                </div>
                <div className="user_connection_input_container user_connection_input_container_submit_btn">
                    <input type="submit" value="connexion" />
                </div>
                <div style={{marginTop: '50px', fontSize: '15px'}}>
                    <p>mot de passe oublier ?</p>
                </div>
                {loginFailedDisplay &&
                    <div>
                        <p>{loginFailed}</p>
                    </div>
                }
            </form>
        </div>
    )
}


export default Login