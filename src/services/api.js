import axios from 'axios'

const api = axios.create({
  baseURL: 'https://laravel-auth-backend-65.onrender.com/api',
})

export default api
