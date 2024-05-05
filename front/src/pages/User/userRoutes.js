import React from "react"
import { Routes, Route } from "react-router-dom"
import Account from "./account"
import Error from "../../_utils/error"


const UserRoutes = () => {

    return (
        <Routes>
            <Route path="/account/:id" element={<Account/>} />
            <Route path="*" element={<Error/>} />
        </Routes>
    )
}


export default UserRoutes