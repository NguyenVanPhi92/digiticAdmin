import axios from 'axios'
import { base_url } from '../../utils/baseUrl'

const getUsers = async () => (await axios.get(`${base_url}user/all-users`)).data

const customerService = {
    getUsers
}

export default customerService
