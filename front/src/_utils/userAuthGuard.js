import React, { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { UserService } from "../_services/user.service"
import CustomLoader from '../_utils/customeLoader/customLoader'


const UserAuthGuard = ({ children }) => {
    const [log, setLog] = useState(null)
    const [isCheckComplete, setIsCheckComplete] = useState(false)

    useEffect(() => {
        UserService.isLogged()
            .then(res => {
                setLog(res)
                setIsCheckComplete(true)
            })
            .catch(err => console.log(err))
    }, [])


    if (!isCheckComplete || log === null) {
        return <CustomLoader/>
    }

    
    if (log === false) {
        return <Navigate to="/login_inscription/main/connexion"/>
    }

    return children
}

export default UserAuthGuard