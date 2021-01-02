// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
<<<<<<< HEAD
import axios from './axios'
import md5 from "js-md5"
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/apis'
Vue.prototype.$md5 = md5

=======
import VueResource from 'vue-resource'
>>>>>>> a1e09a4fac3e3924a65a6b73a177502bb4b36c36
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
