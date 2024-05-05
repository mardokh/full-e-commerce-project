import React, { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { AdminService } from "../_services/admin.service"


const AdminAuthGuard = ({ children }) => {
    const [log, setLog] = useState(null)
    const [isCheckComplete, setIsCheckComplete] = useState(false)

    useEffect(() => {
        AdminService.isLogged()
            .then(res => {
                setLog(res)
                setIsCheckComplete(true)
            })
            .catch(err => console.log(err))
    }, [])


    if (!isCheckComplete || log === null) {
        return <div>Loading...</div>
    }

    
    if (log === false) {
        return <Navigate to="/auth/login" />
    }

    return children
}

export default AdminAuthGuard
