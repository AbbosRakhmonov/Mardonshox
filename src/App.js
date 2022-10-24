import {Navigate, Route, Routes} from 'react-router-dom'
import React, {lazy, useLayoutEffect} from 'react'
import {useDispatch} from 'react-redux'
import {logIn} from './Features/Auth/authSlice'


const Dashboard = lazy(() => import('./Features/Dashboard/dashboard'))
const Todos = lazy(() => import('./Features/Todos/todos'))
const Layout = lazy(() => import('./Features/Layout'))

// const Register = lazy(() => import('./Features/Auth/register'))


function App() {
    return (<Layout>
        <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path={'firm/:id'} element={<Todos/>}/>
            <Route path="*" element={<Navigate to={-1}/>}/>
        </Routes>
    </Layout>)


}

export default App
