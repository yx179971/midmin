import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '@/stores'
import authRoute from './auth'
import userRoute from './user'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    authRoute,
    userRoute,
  ],
})

router.beforeEach(async (to) => {
  const store = useStore()

  if (!store.user) {
    await store.getLogin()
    // await nextTick()
  }

  if (to.meta.requiresAuth && !store.user) {
    return {
      path: '/login',
      query: { redirect: to.fullPath }
    }
  }

  if (to.name === 'login' && store.user) {
    return '/'
  }

})

export default router
