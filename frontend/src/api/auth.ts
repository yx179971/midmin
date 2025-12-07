import api, { type ApiResponse } from '@/utils/request'
import type { RegisterFormModel, authUser } from '@/interface'


export const authApi = {
  async getLogin() {
    const { data: { data } } = await api.get<ApiResponse<authUser>>('/auth/login')
    return data
  },
  async login(username: string, password: string) {
    const { data: { data } } = await api.post<ApiResponse<authUser>>('/auth/login', { username, password })
    return data
  },
  async logout() {
    const { data: { success } } = await api.post<ApiResponse>('/auth/logout')
    return success
  },
  async register(data: RegisterFormModel) {
    const { data: { data: res } } = await api.post<ApiResponse<authUser>>('/auth/register', data)
    return res
  }
}
