import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import VueRouter from 'vue-router'
import Landing from './Landing'

Vue.use(VueCompositionApi)
Vue.use(VueRouter);
Vue.config.productionTip = false

const router = new VueRouter({
    base: __dirname,
    routes: [
      { name: 'landing', path: '/', component: Landing, meta: { requiresAuth: false } }
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
