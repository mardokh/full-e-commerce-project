import axios from "axios"
import { AccountService } from "./account.service"


const Axios = axios.create({
    baseURL: 'http://localhost:8989',
    withCredentials: true
})



Axios.interceptors.request.use( (request) => {

    const token = AccountService.getToken()
    
    if (token) {
        request.headers.Authorization = 'Bearer '+AccountService.getToken()
    }
    return request
})



export default Axios