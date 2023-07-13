// lấy ra token từ localStorage
const getTokenFromLocalStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null

// truyền token vào headers
export const config = {
    headers: {
        Authorization: `Bearer ${
            getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ''
        }`,
        Accept: 'application/json'
    }
}
