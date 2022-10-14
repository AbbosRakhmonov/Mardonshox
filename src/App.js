import {Route, Routes} from 'react-router-dom'
import Layout from './Features/Layout'
import {lazy} from 'react'

const Dashboard = lazy(() => import('./Features/Dashboard/dashboard'))
const Todos = lazy(() => import('./Features/Todos/todos'))

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path={'/:name'} element={<Todos/>}/>
            </Routes>
        </Layout>
    )
}

export default App
