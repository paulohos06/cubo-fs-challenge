import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueFlashMessage from 'vue-flash-message'
import Tooltip from 'vue-directive-tooltip'

import 'vue-flash-message/dist/vue-flash-message.min.css'
import 'vue-directive-tooltip/dist/vueDirectiveTooltip.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000'
})
Vue.use(VueFlashMessage)
Vue.use(Tooltip)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')