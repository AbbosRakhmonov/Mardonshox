import React, {lazy, Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import store from './App/store'
import {Provider} from 'react-redux'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoutes from './Features/protectedRoutes'

const Login = lazy(() => import('./Features/Auth/login'))
const App = lazy(() => import('./App'))
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Router>
        <ToastContainer/>
        <Suspense fallback={'Loading...'}>
            <Provider store={store}>
                <Routes>
                    <Route element={<Login/>} path={'/login'}/>
                    <Route element={<ProtectedRoutes/>}>
                        <Route path={'/*'} element={<App/>}/>
                    </Route>
                </Routes>
            </Provider>
        </Suspense>
    </Router>
)
