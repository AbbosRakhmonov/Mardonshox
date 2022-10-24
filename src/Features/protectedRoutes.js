import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'

function ProtectedRoutes() {
    const {isLogged} = useSelector(state => state.auth)
    if (!isLogged) {
        return <Navigate to={'/login'} replace={true}/>
    }
    return <Outlet/>
}

export default ProtectedRoutes