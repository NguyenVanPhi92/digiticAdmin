import * as yup from 'yup'

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
