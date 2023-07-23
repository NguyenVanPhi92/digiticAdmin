import { login } from 'features/auth/authSlice'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { LoginSchema } from 'schema'
import CustomInput from '../components/CustomInput'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authState = useSelector((state) => state)
    const { user, isError, isSuccess, isLoading, message } = authState.auth

    useEffect(() => {
        if (isSuccess) {
            navigate('/admin')
        } else {
            navigate('')
        }
    }, [user, isError, isSuccess, isLoading])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: LoginSchema,
        // submit form
        onSubmit: (values) => {
            dispatch(login(values))
        }
    })

    return (
        <div className='py-5' style={{ background: '#ffd333', minHeight: '100vh' }}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
                <h3 className='text-center title'>Login</h3>
                <p className='text-center'>Login to your account to continue.</p>
                <div className='error text-center'>
                    {message.message == 'Rejected' ? 'You are not an Admin' : ''}
                </div>

                <form action='' onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type='text'
                        label='Email Address'
                        id='email'
                        name='email'
                        onChng={formik.handleChange('email')}
                        onBlr={formik.handleBlur('email')}
                        val={formik.values.email}
                    />
                    <div className='error mt-2'>{formik.touched.email && formik.errors.email}</div>
                    <CustomInput
                        type='password'
                        label='Password'
                        id='pass'
                        name='password'
                        onChng={formik.handleChange('password')}
                        onBlr={formik.handleBlur('password')}
                        val={formik.values.password}
                    />
                    <div className='error mt-2'>
                        {formik.touched.password && formik.errors.password}
                    </div>
                    <div className='mb-3 text-end'>
                        <Link to='forgot-password' className=''>
                            Forgot Password?
                        </Link>
                    </div>
                    <button
                        className='border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5'
                        style={{ background: '#ffd333' }}
                        type='submit'
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
