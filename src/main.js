import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import './plugins/dragresize.js'
import router from './router'
import './directives'
import './style/reset.less'
import 'swiper/css/swiper.css'
import 'viewerjs/dist/viewer.css'


// 图像指令
import Viewer from 'v-viewer'
Vue.use(Viewer, {
  debug: true,
  defaultOptions: {
    zIndex: 9999
  }
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
