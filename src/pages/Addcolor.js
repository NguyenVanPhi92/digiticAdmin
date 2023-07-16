import { useFormik } from 'formik'
import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AddColorSchema } from 'schema'
import CustomInput from '../components/CustomInput'
import { createColor, getAColor, resetState, updateAColor } from '../features/color/colorSlice'

const Addcolor = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const getColorId = location.pathname.split('/')[3]
    const newColor = useSelector((state) => state.color)
    const { isSuccess, isError, isLoading, createdColor, updatedColor, colorName } = newColor

    useEffect(() => {
        if (getColorId !== undefined) {
            dispatch(getAColor(getColorId))
        } else {
            dispatch(resetState())
        }
    }, [getColorId])

    useEffect(() => {
        if (isSuccess && createdColor) {
            toast.success('Color Added Successfullly!')
        }
        if (isSuccess && updatedColor) {
            toast.success('Color Updated Successfullly!')
            navigate('/admin/list-color')
        }
        if (isError) {
            toast.error('Something Went Wrong!')
        }
    }, [isSuccess, isError, isLoading, createdColor])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: colorName || ''
        },
        validationSchema: AddColorSchema,
        // submit form
        onSubmit: (values) => {
            if (getColorId !== undefined) {
                const data = { id: getColorId, colorData: values }
                dispatch(updateAColor(data))
                dispatch(resetState())
            } else {
                dispatch(createColor(values))
                formik.resetForm()
                setTimeout(() => {
                    dispatch(resetState())
                }, 300)
            }
        }
    })
    return (
        <div>
            <h3 className='mb-4 title'>{getColorId !== undefined ? 'Edit' : 'Add'} Color</h3>
            <div>
                <form action='' onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type='color'
                        label='Enter Product Color'
                        onChng={formik.handleChange('title')}
                        onBlr={formik.handleBlur('title')}
                        val={formik.values.title}
                        id='color'
                    />
                    <div className='error'>{formik.touched.title && formik.errors.title}</div>
                    <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                        {getColorId !== undefined ? 'Edit' : 'Add'} Color
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Addcolor
