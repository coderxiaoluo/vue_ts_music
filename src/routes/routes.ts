// import type { RouteRecordRaw } from 'vue-router'
export const routes = [
  {
    path: '/',
    component: () => import('@/views/home/home.vue'),
    redirect: '/findmusic/recommend',
    children: [
      {
        path: '/findmusic',
        name: 'Find',
        component: () => import('../views/home/find-music/find-music.vue')
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
            component: () => import('../views/home/find-music/musiclist/music-list.vue')
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
      }
    ]
  },
  // 二级路由
  // video
  {
    name: 'Video',
    path: '/video',
    component: () => import('@/views/home/home.vue'),
    redirect: '/video/videos',
    children: [
      {
        path: '/video/videos',
        name: 'Videos',
        component: () => import('@/views/home/video/video.vue')
      }
    ]
  },
  {
    name: 'MusicDetail',
    path: '/musicdetail/:id',
    component: () => import('@/views/home/home.vue'),
    redirect: '/musicdetail/:id',
    children: [
      {
        path: '/musicdetail/:id',
        name: 'MusicDetails',
        component: () => import('@/views/home/musicdetail/music-detail.vue')
      }
    ]
  },

  // 用户路由
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('@/views/home/home.vue'),
    redirect: '/user/:id',
    children: [
      {
        path: '/user/:id',
        component: () => import('@/views/home/user/user.vue')
      }
    ]
  },
  {
    name: 'notfound',
    path: '/:pathMatch(.*)',
    component: () => import('../views/not-found/not-found.vue')
  }
]
