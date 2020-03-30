import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Toast from 'vue-easy-toast'

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000'
})
Vue.use(Toast)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
