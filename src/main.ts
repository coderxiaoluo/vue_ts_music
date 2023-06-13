import { createApp } from 'vue'
import App from './App.vue'
// 引入less style
import './assets/less/index.css'
// 引入主题色
import './theme/index.css'
// 清除默认样式
import 'normalize.css'
// element信息提示组件样式
import 'element-plus/theme-chalk/el-message.css'
// wow.js animate.css
import 'animate.css'
import 'animate.css/animate.compat.css'

// Import Swiper styles
// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'
import 'swiper/css/navigation'
import axios from 'axios'

// store
import store from './stores'
// router
import router from './routes'

// 注册所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// axios({
//   method: 'get',
//   // http://api.map.baidu.com/reverse_geocoding/v3/?ak=你的AK&output=json&coordtype=wgs84ll&location=31.225696,121.49884
//   url: 'reverse_geocoding/v3/?ak=7ejPjXA5vblz2PFSv3fRXTEGlvLN32sy&output=json&coordtype=wgs84ll&location=31.225696,121.49884'
// }).then((res) => {
//   console.log(res)
// })
app.use(store)
app.use(router)
app.mount('#app')
