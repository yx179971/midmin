import axios from 'axios'
import type { AxiosInstance, AxiosError } from 'axios'
import { ElNotification } from 'element-plus';

export interface ApiResponse<T = null> {
  success: boolean
  data: T
  message?: string
}

const api: AxiosInstance = axios.create({
  baseURL: '/api',
})

const toSearchParams = (obj: Record<string, string|number|boolean>): URLSearchParams => {
  const qs = new URLSearchParams()
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      qs.append(k, String(v))
    }
  })
  return qs
}

api.interceptors.request.use(
  (config) => {
    if (config.params) {
      config.params = toSearchParams(config.params)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError<ApiResponse>) => {
    ElNotification({
      title: 'Error',
      message: error.response?.data?.message || error.message,
      type: 'error',
    })
    return Promise.reject(error)
  },
)

export default api
