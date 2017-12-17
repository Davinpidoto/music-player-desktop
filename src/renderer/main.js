import Vue from 'vue'
import axios from 'axios'

import App from './App'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.prototype.$eventHub = new Vue()
Vue.prototype.$base = 'http://192.168.0.20:8080/'

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
