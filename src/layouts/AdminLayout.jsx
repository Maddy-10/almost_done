import React from 'react'
import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const AdminLayout = () => {
    return (
        <>
            <Helmet>
            <title>Shop-Admin</title>
            </Helmet>            
            <Outlet/>
        </>
    )
}

export default AdminLayout