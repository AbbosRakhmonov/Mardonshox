import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../Features/Auth/authSlice'
import firmReducer from '../Features/Dashboard/dashboardSlice'
import todoReducer from '../Features/Todos/todoSlice'

export default configureStore({
    reducer: {
        auth: authReducer,
        firm: firmReducer,
        report: todoReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
})