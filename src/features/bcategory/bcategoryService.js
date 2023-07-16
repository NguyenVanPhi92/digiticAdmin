import axios from 'axios'
import { config } from '../../utils/axiosconfig'
import { base_url } from '../../utils/baseUrl'

const getBlogCategories = async () => (await axios.get(`${base_url}blogcategory/`)).data

const createBlogCategory = async (bcat) => {
    return (await axios.post(`${base_url}blogcategory/`, bcat, config)).data
}
const updateBlogCategory = async (blogCat) => {
    const response = await axios.put(
        `${base_url}blogcategory/${blogCat.id}`,
        { title: blogCat.blogCatData.title },
        config
    )

    return response.data
}
const getBlogCategory = async (id) => {
    return (await axios.get(`${base_url}blogcategory/${id}`, config)).data
}
const deleteBlogCategory = async (id) => {
    return (await axios.delete(`${base_url}blogcategory/${id}`, config)).data
}

const bCategoryService = {
    getBlogCategories,
    createBlogCategory,
    deleteBlogCategory,
    getBlogCategory,
    updateBlogCategory
}

export default bCategoryService
