import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AccountService } from "../../_services/account.service"
import './login.css'
import logo from '../../images/logo.png'
import BouncingDotsLoader from "../../_utils/customeLoader/dotsLoader"


const Login = () => {

    // STATES //
    const [loader, setLoader] = useState(false)
    const [loginFailed, setLoginFailed] = useState("")
    const [loginFailedDisplay, setLoginFailedDisplay] = useState(false)

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


    // Handle errors
    const handleError = (err) => {
        setLoader(false)
        if (err.response && err.response.status) {
            setLoginFailed(err.response.data.message)
            setLoginFailedDisplay(true)
        } else {
            console.log('Error:', err.message)
        }
    }


    // ON SUBMIT FORM //
    const submitFrom = async (e) => {
        e.preventDefault()

        try {
            // Loader
            setLoader(true)

            // API call for send credentials
            const res = await AccountService.login(credentials)

            // Save token to local storage
            AccountService.saveToken(res.data.access_token)

            // Redirect
            navigate("/admin")
        }
        catch (err) {
            handleError(err)
        }
    }



    return(
        <div className="login_form_global_container">
            <div className="login_form_parent_container">
                <form onSubmit={submitFrom} className="login_form">
                    <div className="login_logo_container">
                        <img src={logo} className='logo'/>
                    </div>
                    <div className="login_form_sub_container">
                        <div className="login_form_identifiant">
                            <label>Identifiant</label>
                            <input type="text" name="identifiant" onChange={(e) => inputChange(e.target.name, e.target.value)}/>
                        </div>
                        <div className="login_form_password ">
                            <label>Password</label>
                            <input type="password" name="password" onChange={(e) => inputChange(e.target.name, e.target.value)} />
                        </div>
                        <div className="login_btn_cnx_new_account_container">
                            <div className="login_failed_container">
                                {loginFailedDisplay &&
                                    <p className="login_failed">{loginFailed}</p>
                                }
                            </div>
                            <div className="login_btn_connexion_container">
                                {loader ? 
                                <BouncingDotsLoader/>
                                :
                                <input type="submit" value="connexion" />
                                }
                            </div>
                            <div className="login_btn_create_account_container">
                                <button>create new account</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Login