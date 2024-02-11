import React, { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { AccountService } from "../_services/account.service"


const AuthGuard = ({ children }) => {
    const [log, setLog] = useState(null)
    const [isCheckComplete, setIsCheckComplete] = useState(false)

    useEffect(() => {
        AccountService.isLogged()
            .then(res => {
                console.log(res)
                setLog(res)
                setIsCheckComplete(true)
            })
            .catch(err => console.log(err));
    }, [])


    if (!isCheckComplete || log === null) {
        return <div>Loading...</div>
    }

    
    if (log === false) {
        return <Navigate to="/auth/login" />
    }

    return children
}

export default AuthGuard
