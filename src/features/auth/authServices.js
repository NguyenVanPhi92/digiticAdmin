import axios from 'axios'
import { config } from '../../utils/axiosconfig'
import { base_url } from '../../utils/baseUrl'

// sau khi login sẽ lưu thông tin user vào localStorage và trả về data user
const login = async (user) => {
    const response = await axios.post(`${base_url}user/admin-login`, user)
    if (response.data) localStorage.setItem('user', JSON.stringify(response.data))

    return response.data
}

const getOrders = async () => {
    const response = await axios.get(`${base_url}user/getallorders`, config)
    return response.data
}

/**
 * config -> token truyền vào headers
 * @param {*} id order
 * @returns detail order
 */
const getOrder = async (id) => {
    const response = await axios.post(`${base_url}user/getorderbyuser/${id}`, '', config)
    return response.data
}

const authService = {
    login,
    getOrders,
    getOrder
}

export default authService
