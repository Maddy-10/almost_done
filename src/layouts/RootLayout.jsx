import React from 'react'
import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const RootLayout = () => {
    return (
        <>
            <Helmet>
            <title>Shop</title>
            </Helmet>            
            <Outlet/>
        </>
    )
}

export default RootLayout