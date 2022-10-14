import React, {lazy, Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'

const App = lazy(() => import('./App'))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Router>
        <Suspense fallback={'Loading...'}>
            <App/>
        </Suspense>
    </Router>
)
