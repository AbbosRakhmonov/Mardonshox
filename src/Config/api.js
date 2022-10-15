import axios from 'axios'
import {logOut} from '../Features/Auth/authSlice'
import Store from '../App/store'

const instance = axios.create({
    baseURL: `http://localhost:5000/api/v1`,
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
    ({response: {data, status}}) => {
        if (status === 401) {
            localStorage.removeItem('token')
            Store.dispatch(logOut('Авторизация устарела'))
        }
        return Promise.reject(data.error)
    }
)

export default instance
