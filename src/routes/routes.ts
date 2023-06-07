import type { RouteRecordRaw } from 'vue-router'
export const routes = [
  {
    path: '/',
    component: () => import('../views/home/home.vue'),
    // redirect: '/findmusic',
    redirect: '/findmusic/recommend',
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

  // 四个嵌套路由
  {
    path: '/findmusic',
    component: () => import('../views/home/home.vue'),
    children: [
      {
        path: '/findmusic',
        name: 'Find',
        component: () => import('../views/home/find-music/find-music.vue'),
        children: [
          // 个性推荐
          {
            path: '/findmusic/recommend',
            name: 'Recommend',
            component: () => import('../views/home/find-music/recommend/recommend.vue')
          },
          {
            path: '/findmusic/musiclist',
            name: 'Musiclist',
            component: () => import('../views/home/find-music/musiclist/musiclist.vue')
          },
          {
            path: '/findmusic/ranking',
            name: 'Ranking',
            component: () => import('../views/home/find-music/ranking/ranking.vue')
          },
          {
            path: '/findmusic/singer',
            name: 'Singer',
            component: () => import('../views/home/find-music/singer/singer.vue')
          }
        ]
      },
      {
        path: '/findmusic/video',
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
