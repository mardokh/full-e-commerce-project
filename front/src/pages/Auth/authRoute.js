import React from "react"
import { Routes, Route } from "react-router-dom"
import Login from "./Login"
import Error from "../../_utils/error"


const AuthRoute = () => {

    return (
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="*" element={<Error/>} />
        </Routes>
    )
}


export default AuthRoute