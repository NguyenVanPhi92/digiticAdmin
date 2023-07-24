import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedLogin = ({ children, auth }) => {
    if (auth) {
        return <Navigate to='/admin' />
    }

    return <>{children}</>
}

export default ProtectedLogin
