// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import Bus from 'vue-bus'
import store from './store/index'
import 'font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.use(Vuex)
Vue.use(Bus)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
