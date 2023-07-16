import { useFormik } from 'formik'
import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AddCatSchema } from 'schema'
import CustomInput from '../components/CustomInput'
import {
    createCategory,
    getAProductCategory,
    resetState,
    updateAProductCategory
} from '../features/pcategory/pcategorySlice'

const Addcat = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const getPCatId = location.pathname.split('/')[3]
    const navigate = useNavigate()
    const newCategory = useSelector((state) => state.pCategory)
    const { isSuccess, isError, isLoading, createdCategory, categoryName, updatedCategory } =
        newCategory

    useEffect(() => {
        if (getPCatId !== undefined) {
            dispatch(getAProductCategory(getPCatId))
        } else {
            dispatch(resetState())
        }
    }, [getPCatId])

    useEffect(() => {
        if (isSuccess && createdCategory) {
            toast.success('Category Added Successfullly!')
        }
        if (isSuccess && updatedCategory) {
            toast.success('Category Updated Successfullly!')
            navigate('/admin/list-category')
        }
        if (isError) {
            toast.error('Something Went Wrong!')
        }
    }, [isSuccess, isError, isLoading])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: categoryName || ''
        },
        validationSchema: AddCatSchema,
        // submit form
        onSubmit: (values) => {
            if (getPCatId !== undefined) {
                const data = { id: getPCatId, pCatData: values }
                dispatch(updateAProductCategory(data))
                dispatch(resetState())
            } else {
                dispatch(createCategory(values))
                formik.resetForm()
                setTimeout(() => {
                    dispatch(resetState())
                }, 300)
            }
        }
    })
    return (
        <div>
            <h3 className='mb-4  title'>{getPCatId !== undefined ? 'Edit' : 'Add'} Category</h3>
            <div>
                <form action='' onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type='text'
                        label='Enter Product Category'
                        onChng={formik.handleChange('title')}
                        onBlr={formik.handleBlur('title')}
                        val={formik.values.title}
                        id='brand'
                    />
                    <div className='error'>{formik.touched.title && formik.errors.title}</div>
                    <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                        {getPCatId !== undefined ? 'Edit' : 'Add'} Category
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Addcat
