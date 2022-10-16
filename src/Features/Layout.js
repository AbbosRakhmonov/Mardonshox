import React from 'react'
import Header from './Header/header'

function Layout({children}) {
    return (
        <>
            <Header/>
            {children}
        </>
    )
}

export default Layout