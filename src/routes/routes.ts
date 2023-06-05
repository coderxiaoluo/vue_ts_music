import type { RouteRecordRaw } from 'vue-router'
export const routes = [
  {
    path: '/',
    component: () => import('../views/home/home.vue'),
    redirect: '/findmusic',
    children: [
      {
        path: '/findmusic',
        name: 'Find',
        component: () => import('../views/home/find-music/find-music.vue')
      },
      {
        path: '/video',
        name: 'Video',
        component: () => import('../views/home/video/video.vue')
      }
    ]
  },
  // 登录后查看
  // {
  //   name: 'create',
  //   path: '/create',
  //   component: () => import('../views/home/home.vue'),
  //   redirect: '/create/me',
  //   children: [
  //     {
  //       path: '/create/me',
  //       name:"Me",
  //       component:() => import("")
  //     }
  //   ]
  // },
  {
    name: 'notfound',
    path: '/:pathMatch(.*)',
    component: () => import('../views/not-found/not-found.vue')
  }
]
