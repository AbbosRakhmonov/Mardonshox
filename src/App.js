import {Navigate, Route, Routes} from 'react-router-dom'
import React, {lazy, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {logIn} from './Features/Auth/authSlice'


const Dashboard = lazy(() => import('./Features/Dashboard/dashboard'))
const Todos = lazy(() => import('./Features/Todos/todos'))
const Login = lazy(() => import('./Features/Auth/login'))
const Layout = lazy(() => import('./Features/Layout'))

// const Register = lazy(() => import('./Features/Auth/register'))


function App() {
    const dispatch = useDispatch()
    const {isLogged} = useSelector(state => state.auth)
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            dispatch(logIn(token))
        }
    }, [dispatch])
    return !isLogged ? <Routes>
        <Route path={'/login'} element={<Login/>}/>
        <Route path="*" element={<Navigate to={'/login'}/>}/>
    </Routes> : <Layout>
        <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path={'firm/:id'} element={<Todos/>}/>
            <Route path="*" element={<Navigate to={-1}/>}/>
        </Routes>
    </Layout>


}

export default App
