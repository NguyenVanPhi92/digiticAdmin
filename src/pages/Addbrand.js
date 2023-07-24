import { useFormik } from 'formik'
import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Brandschema } from 'schema'
import CustomInput from '../components/CustomInput'
import { createBrand, getABrand, resetState, updateABrand } from '../features/brand/brandSlice'

const Addbrand = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const getBrandId = location.pathname.split('/')[3]
    const newBrand = useSelector((state) => state.brand)
    const { isSuccess, isError, isLoading, createdBrand, brandName, updatedBrand } = newBrand

    useEffect(() => {
        if (getBrandId !== undefined) {
            dispatch(getABrand(getBrandId)) // lay ra branh theo id
        } else {
            dispatch(resetState())
        }
    }, [getBrandId])

    useEffect(() => {
        if (isSuccess && createdBrand) {
            toast.success('Brand Added Successfullly!')
            navigate('/admin/list-brand')
        }
        if (isSuccess && updatedBrand) {
            toast.success('Brand Updated Successfullly!')
            navigate('/admin/list-brand')
        }

        if (isError) {
            toast.error('Something Went Wrong!')
        }
    }, [isSuccess, isError, isLoading])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: brandName || ''
        },
        validationSchema: Brandschema,
        // submit form
        onSubmit: (values) => {
            if (getBrandId !== undefined) {
                const data = { id: getBrandId, brandData: values }
                dispatch(updateABrand(data))
                dispatch(resetState())
            } else {
                dispatch(createBrand(values))
                formik.resetForm()
                setTimeout(() => {
                    dispatch(resetState())
                }, 300)
            }
        }
    })

    return (
        <div>
            <h3 className='mb-4 title'>{getBrandId !== undefined ? 'Edit' : 'Add'} Brand</h3>
            <div>
                <form action='' onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type='text'
                        name='title'
                        onChng={formik.handleChange('title')}
                        onBlr={formik.handleBlur('title')}
                        val={formik.values.title}
                        label='Enter Brand'
                        id='brand'
                    />
                    <div className='error'>{formik.touched.title && formik.errors.title}</div>
                    <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                        {getBrandId !== undefined ? 'Edit' : 'Add'} Brand
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Addbrand
