import axios from 'axios'
import { base_url } from '../../utils/baseUrl'
import { config } from '../../utils/axiosconfig'

const getProductCategories = async () => {
    return (await axios.get(`${base_url}category/`)).data
}

const createCategory = async (category) => {
    return (await axios.post(`${base_url}category/`, category, config)).data
}

const getProductCategory = async (id) => {
    return (await axios.get(`${base_url}category/${id}`, config)).data
}

const deleteProductCategory = async (id) => {
    return (await axios.delete(`${base_url}category/${id}`, config)).data
}

const updateProductCategory = async (category) => {
    console.log(category)
    const response = await axios.put(
        `${base_url}category/${category.id}`,
        { title: category.pCatData.title },
        config
    )

    return response.data
}

const pCategoryService = {
    getProductCategories,
    createCategory,
    getProductCategory,
    deleteProductCategory,
    updateProductCategory
}

export default pCategoryService
