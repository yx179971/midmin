export default {
  path: '/users',
  component: () => import('@/layouts/myLayout.vue'),
  meta: {
    requiresAuth: true, isAdmin: true
  },
  children: [
    {
      path: '',
      component: () => import('@/views/user/UserListView.vue'),
    },
  ]
}
