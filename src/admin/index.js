import Vue from 'vue'
import VueRouter from 'vue-router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import Landing from './Landing'
import UserManagement from './components/UserManagement'
import AdManagement from './components/AdManagement'

Vue.use(VueRouter);
Vue.config.productionTip = false

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
      { name: 'landing', path: '/', component: Landing },
      { name: 'users', path: '/users', component: UserManagement },
      { name: 'posts', path: '/posts', component: AdManagement }
    ]
});

new Vue({
  router,
  template: `
  <div class="container-fluid">
    <nav class="nav">
      <a class="nav-link active" href="/users">users</a>
      <a class="nav-link" href="/posts">posts</a>
    </nav>
    <router-view class="view"></router-view>
  </div>
  `,
}).$mount('#app');
