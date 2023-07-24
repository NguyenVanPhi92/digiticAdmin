import MainLayout from 'components/MainLayout'
import Login from 'pages/Login'
import React from 'react'
import { useRoutes } from 'react-router-dom'

const RoutePage = () => {
    const routes = useRoutes([
        {
            path: '/',
            element: <MainLayout />
        },
        {
            path: '/login',
            element: <Login />
        }
    ])
    return routes
}

export default RoutePage
