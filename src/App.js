import MainLayout from 'components/MainLayout'
import ProtectedLogin from 'guards/ProtectedLogin'
import ProtectedRoute from 'guards/ProtectedRoute'
import AddCoupon from 'pages/AddCoupon'
import Addblog from 'pages/Addblog'
import Addblogcat from 'pages/Addblogcat'
import Addbrand from 'pages/Addbrand'
import Addcat from 'pages/Addcat'
import Addcolor from 'pages/Addcolor'
import Addproduct from 'pages/Addproduct'
import Blogcatlist from 'pages/Blogcatlist'
import Bloglist from 'pages/Bloglist'
import Brandlist from 'pages/Brandlist'
import Categorylist from 'pages/Categorylist'
import Colorlist from 'pages/Colotlist'
import Couponlist from 'pages/Couponlist'
import Customers from 'pages/Customers'
import Dashboard from 'pages/Dashboard'
import Enquiries from 'pages/Enquiries'
import Forgotpassword from 'pages/Forgotpassword'
import Login from 'pages/Login'
import Orders from 'pages/Orders'
import Productlist from 'pages/Productlist'
import Resetpassword from 'pages/Resetpassword'
import ViewEnq from 'pages/ViewEnq'
import ViewOrder from 'pages/ViewOrder'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'

function App() {
    const auth = useSelector((state) => state.auth?.user?._id)
    const navigate = useNavigate()

    // lầm đàu bật app chekc xem user đã login chưa nếu chưa thì redirec sang trang login
    useEffect(() => {
        if (auth) {
            navigate('/admin')
        } else {
            navigate('login')
        }
    }, [auth])

    return (
        <Routes>
            <Route
                path='/login'
                element={
                    <ProtectedLogin auth={auth}>
                        <Login />
                    </ProtectedLogin>
                }
            />
            <Route path='/reset-password' element={<Resetpassword />} />
            <Route path='/forgot-password' element={<Forgotpassword />} />

            {/* Trang cha path bắt đầu là /admin */}
            <Route
                path='/admin'
                element={
                    <ProtectedRoute auth={auth}>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >
                {/* Các trang con sẽ có path là /admin/.... */}
                <Route
                    index
                    element={
                        <ProtectedRoute auth={auth}>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='customers'
                    element={
                        <ProtectedRoute auth={auth}>
                            <Customers />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='product'
                    element={
                        <ProtectedRoute auth={auth}>
                            <Addproduct />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='list-product'
                    element={
                        <ProtectedRoute auth={auth}>
                            <Productlist />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='list-brand'
                    element={
                        <ProtectedRoute auth={auth}>
                            <Brandlist />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='brand'
                    element={
                        <ProtectedRoute auth={auth}>
                            <Addbrand />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='brand/:id'
                    element={
                        <ProtectedRoute auth={auth}>
                            <Addbrand />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='list-category'
                    element={
                        <ProtectedRoute auth={auth}>
                            <Categorylist />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='category'
                    element={
                        <ProtectedRoute auth={auth}>
                            <Addcat />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='category/:id'
                    element={
                        <ProtectedRoute auth={auth}>
                            <Addcat />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='list-color'
                    element={
                        <ProtectedRoute auth={auth}>
                            <Colorlist />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='color'
                    element={
                        <ProtectedRoute auth={auth}>
                            <Addcolor />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='color/:id'
                    element={
                        <ProtectedRoute auth={auth}>
                            <Addcolor />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='coupon-list'
                    element={
                        <ProtectedRoute auth={auth}>
                            <Couponlist />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='coupon'
                    element={
                        <ProtectedRoute auth={auth}>
                            <AddCoupon />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='coupon/:id'
                    element={
                        <ProtectedRoute auth={auth}>
                            <AddCoupon />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='orders'
                    element={
                        <ProtectedRoute auth={auth}>
                            <Orders />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='order/:id'
                    element={
                        <ProtectedRoute auth={auth}>
                            <ViewOrder />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='blog-list'
                    element={
                        <ProtectedRoute auth={auth}>
                            <Bloglist />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='blog'
                    element={
                        <ProtectedRoute auth={auth}>
                            <Addblog />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='blog/:id'
                    element={
                        <ProtectedRoute auth={auth}>
                            <Addblog />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path='blog-category-list'
                    element={
                        <ProtectedRoute auth={auth}>
                            <Blogcatlist />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='blog-category'
                    element={
                        <ProtectedRoute auth={auth}>
                            <Addblogcat />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='blog-category/:id'
                    element={
                        <ProtectedRoute auth={auth}>
                            <Addblogcat />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path='enquiries'
                    element={
                        <ProtectedRoute auth={auth}>
                            <Enquiries />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='enquiries/:id'
                    element={
                        <ProtectedRoute auth={auth}>
                            <ViewEnq />
                        </ProtectedRoute>
                    }
                />
                <Route path='*' element={<h3>Error...</h3>} />
            </Route>
        </Routes>
    )
}

export default App
