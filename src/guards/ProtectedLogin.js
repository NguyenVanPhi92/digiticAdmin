import Login from 'pages/Login'
import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedLogin = ({ auth }) => {
    if (auth) {
        return <Navigate to='/admin' />
    } else {
        return <Login />
    }
}

export default ProtectedLogin
