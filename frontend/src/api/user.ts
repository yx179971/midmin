import api from '@/utils/request.ts'

export const userApi = {
  list() {
    return api.get('/users')
  },
  // get(id: string) {
  //   return api.get(`/users/${id}`)
  // },
  // update(id: string, data: any) {
  //   return api.patch(`/users/${id}`, data)
  // },
  // resetPassword(id: string) {
  //   return api.get(`/users/${id}/reset-password`)
  // },
}
