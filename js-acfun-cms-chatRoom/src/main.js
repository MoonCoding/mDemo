import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限
import * as filter from './utils/filters' // 过滤器

Vue.use(ElementUI)

Vue.config.productionTip = false

Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
