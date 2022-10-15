import React, {lazy, Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
import store from './App/store'
import {Provider} from 'react-redux'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = lazy(() => import('./App'))
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Router>
        <ToastContainer/>
        <Suspense fallback={'Loading...'}>
            <Provider store={store}>
                <App/>
            </Provider>
        </Suspense>
    </Router>
)
