export const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: '/home',
    component: () => import('../views/home/home.vue')
  },
  {
    name: 'notfound',
    path: '/:pathMatch(.*)',
    component: () => import('../views/not-found/not-found.vue')
  },
  {}
]
