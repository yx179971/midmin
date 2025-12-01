import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
}

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
})

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    return response.data
  },
  (error: any) => {
    const status = error.response?.status

    if (status === 401) {
      localStorage.removeItem('token')
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    } else if (status === 403) {
      if (window.location.pathname !== '/403') {
        console.warn('访问被拒绝：权限不足')
      }
    }
    return Promise.reject(error)
  },
)

export default api
