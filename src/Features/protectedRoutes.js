import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from "./Auth/authSlice"

function ProtectedRoutes() {
    const dispatch = useDispatch()
    const { isLogged } = useSelector(state => state.auth)
    if (!isLogged) {
        dispatch(logOut("Autorizatsiyadan o`tilmagan"))
        return <Navigate to={'/login'} replace={true} />
    }
    return <Outlet />
}

export default ProtectedRoutes
