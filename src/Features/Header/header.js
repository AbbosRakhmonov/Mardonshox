import React from 'react'
import {Link} from 'react-router-dom'

function Header() {
    return (
        <header className={'mb-4'}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid justify-content-center flex-column">
                    <Link className="navbar-brand me-0" to={'/'}>Mardonshox</Link>
                </div>
            </nav>
        </header>
    )
}

export default Header