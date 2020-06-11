import Vue from 'vue'
import VueRouter from 'vue-router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '../assets/custom.scss'

import Landing from './Landing'
import UserManagement from './components/UserManagement'
import AdManagement from './components/AdManagement'
import JobManagement from './components/JobManagement'

Vue.use(VueRouter);
Vue.config.productionTip = false

const router = new VueRouter({
    base: __dirname,
    routes: [
      { name: 'landing', path: '/', component: Landing },
      { name: 'users', path: '/users', component: UserManagement },
      { name: 'posts', path: '/posts', component: AdManagement },
      { name: 'jobs', path: '/jobs', component: JobManagement }
    ]
});

new Vue({
  router,
  template: `
  <div class="container-fluid">
    <router-view class="view"></router-view>
  </div>
  `,
}).$mount('#app');
