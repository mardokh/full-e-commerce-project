import axios from "axios"


const Axios = axios.create({
    baseURL: 'http://localhost:8989',
    withCredentials: true
})


Axios.interceptors.request.use( (request) => {

    const adminToken = localStorage.getItem('admin_token')
    const userToken = localStorage.getItem('user_token')

    
    if (adminToken || userToken) {
        request.headers.Authorization = 'Bearer '+adminToken ? adminToken : userToken ? userToken : null
    }
    return request
})



export default Axios