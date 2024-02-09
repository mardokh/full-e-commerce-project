// IMPORT MODULES //
import Axios from "./caller.service"
import { tokenService } from "./token.service"


let login = (credentials) => {
    return Axios.post('/login', credentials)
}

let saveToken = (token) => {
    localStorage.setItem('token', token)
}

let isLogged = () => {
    return new Promise((resolve, reject) => {
        let token = localStorage.getItem('token')

        if (token) {
            tokenService.checkSessionJwt({token: token})
                .then(res => {
                    if (res.data && res.data.message) {
                        resolve(true)
                    }
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        resolve(false)
                    }
                    reject(err)
                })
        } else {
            resolve(false)
        }
    })
}


export const AccountService = {
    login, saveToken, isLogged
}