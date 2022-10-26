import axios from 'axios'
import { logOut } from '../Features/Auth/authSlice'
import Store from '../App/store'

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api/v1' : 'https://mardonshox.herokuapp.com/api/v1'

const instance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
instance.interceptors.response.use(
    (response) => response,
    (response) => {
        console.log(response.status)
        if (response.code === 'ERR_NETWORK') {
            Store.dispatch(logOut('Интернет билан боғлиқ муаммо мавжуд'))
        }
        if (response.status === 401) {
            Store.dispatch(logOut('Авторизация устарела'))
        }
        return Promise.reject(response?.data?.error)
    }
)

export default instance
