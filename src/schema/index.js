import * as yup from 'yup'

export const LoginSchema = yup.object().shape({
    email: yup.string().email('Email should be valid').required('Email is Required'),
    password: yup.string().required('Password is Required')
})

export const AddProductSchem = yup.object().shape({
    title: yup.string().required('Title is Required'),
    description: yup.string().required('Description is Required'),
    price: yup.number().required('Price is Required'),
    brand: yup.string().required('Brand is Required'),
    category: yup.string().required('Category is Required'),
    tags: yup.string().required('Tag is Required'),
    color: yup.array().min(1, 'Pick at least one color').required('Color is Required'),
    quantity: yup.number().required('Quantity is Required')
})

export const Brandschema = yup.object().shape({
    title: yup.string().required('Brand Name is Required')
})

export const AddCatSchema = yup.object().shape({
    title: yup.string().required('Category Name is Required')
})

export const AddColorSchema = yup.object().shape({
    title: yup.string().required('Color is Required')
})

export const AdddBlogSchema = yup.object().shape({
    title: yup.string().required('Title is Required'),
    description: yup.string().required('Description is Required'),
    category: yup.string().required('Category is Required')
})

export const AddBlogCateSchema = yup.object().shape({
    title: yup.string().required('Category Name is Required')
})

export const AddCouponSchema = yup.object().shape({
    name: yup.string().required('Coupon Name is Required'),
    expiry: yup.date().required('Expiry Date is Required'),
    discount: yup.number().required('Discount Percentage is Required')
})
