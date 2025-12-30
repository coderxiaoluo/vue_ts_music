import type { RouteRecordRaw } from 'vue-router'
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/home/home.vue'),
    redirect: '/findmusic/recommend',
    children: [
      {
        path: '/findmusic',
        name: 'Find',
        component: () => import('../views/home/find-music/find-music.vue'),
        children: [
          // 个性推荐
          {
            path: 'recommend',
            name: 'Recommend',
            component: () => import('../views/home/find-music/recommend/recommend.vue')
          },
          {
            path: 'musiclist',
            name: 'Musiclist',
            component: () => import('../views/home/find-music/musiclist/music-list.vue')
          },
          {
            path: 'ranking',
            name: 'Ranking',
            component: () => import('../views/home/find-music/ranking/ranking.vue')
          },
          {
            path: 'singer',
            name: 'Singer',
            component: () => import('../views/home/find-music/singer/singer.vue')
          }
        ]
      }
    ]
  },
  // 视频路由
  {
    path: '/video',
    component: () => import('@/views/home/home.vue'),
    redirect: '/video/video-list',
    children: [
      {
        path: '/video',
        name: 'Video',
        component: () => import('@/views/home/video/video.vue'),
        children: [
          {
            path: 'video-list',
            name: 'VideoList',
            component: () => import('@/views/home/video/videolist/video-list.vue')
          },
          {
            path: 'mv-list',
            name: 'MvList',
            component: () => import('@/views/home/video/mvlist/mv-list.vue')
          }
        ]
      }
    ]
  },

  // 歌单详情
  {
    path: '/musicdetail/:id',
    component: () => import('@/views/home/home.vue'),
    children: [
      {
        path: '',
        name: 'MusicDetail',
        component: () => import('@/views/home/musicdetail/music-detail.vue')
      }
    ]
  },

  // 用户路由
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('@/views/home/home.vue'),
    children: [
      {
        path: '',
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
