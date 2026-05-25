import axios from 'axios'

const api = axios.create({
  baseURL: 'https://vue-auth-frontend-5.onrender.com/api',
})

const token = localStorage.getItem('token')

if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default api
