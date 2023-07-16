import axios from 'axios'
import { base_url } from '../../utils/baseUrl'
import { config } from '../../utils/axiosconfig'

const getColors = async () => (await axios.get(`${base_url}color/`)).data
const createColor = async (color) => (await axios.post(`${base_url}color/`, color, config)).data
const updateColor = async (color) => {
    const response = await axios.put(
        `${base_url}color/${color.id}`,
        { title: color.colorData.title },
        config
    )
    return response.data
}
const getColor = async (id) => (await axios.get(`${base_url}color/${id}`, config)).data
const deleteColor = async (id) => (await axios.delete(`${base_url}color/${id}`, config)).data

const colorService = {
    getColors,
    createColor,
    updateColor,
    getColor,
    deleteColor
}

export default colorService
