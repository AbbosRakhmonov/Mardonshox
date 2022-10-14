import React from 'react'
import Header from './Header/header'

function Layout(props) {
    return (
        <>
            <Header/>
            {props.children}
        </>
    )
}

export default Layout