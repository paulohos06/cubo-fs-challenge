import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueFlashMessage from 'vue-flash-message'

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000'
})

// Flash Messages
require('vue-flash-message/dist/vue-flash-message.min.css')
Vue.use(VueFlashMessage)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
