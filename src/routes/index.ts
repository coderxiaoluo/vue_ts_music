import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
// 引入对应css样式
import 'nprogress/nprogress.css'
import { routes } from './routes'
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

// 修改进度条插件的配置
NProgress.configure({
  showSpinner: false
})
// 前置首位 访问权限控制
router.beforeEach((to) => {
  // 开启页面进度条
  NProgress.start()
})
// 后置守卫
router.afterEach((to) => {
  NProgress.done()
})

export default router
