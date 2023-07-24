import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, auth }) => {
    console.log('auth ', auth)
    if (!auth) return <Navigate to='/login' />

    return <>{children}</>
}

export default ProtectedRoute
