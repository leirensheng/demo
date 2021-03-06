import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.scss'
import createInstance from '@/utils/createInstance'
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$notification = ElementUI.Notification
Vue.prototype.$create = createInstance

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
