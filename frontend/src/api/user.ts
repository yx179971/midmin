import api from '@/utils/request.ts'

export const userApi = {
  getUser() {
    return api.get('/api/get_user')
  },
}
