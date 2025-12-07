import { ref } from 'vue'
import { defineStore } from 'pinia'
import { authApi } from '@/api/auth'
import type { authUser } from '@/interface'

export const useStore = defineStore('loginStore', () => {
  const user = ref<authUser>()

  const login = async (username: string, password: string) => {
    user.value = await authApi.login(username, password)
    console.log(user.value)
  }

  const getLogin = async () => {
    user.value = await authApi.getLogin()
  }

  const logout = async () => {
    await authApi.logout()
  }

  function $reset() {
    user.value = undefined
  }

  return { user, login, getLogin, logout, $reset }
})
