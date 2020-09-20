import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';

import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import Menu from './components/MenuNew'
import History from './components/History'


Vue.use(BootstrapVue)

Vue.use(Chartkick.use(Chart))

Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [{
    path: '/', 
    component : Menu
  },
  {
    path: '/history', 
    component : History
  }
],
  mode: 'history'
})



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
