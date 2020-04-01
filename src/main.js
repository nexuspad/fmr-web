import Vue from 'vue'
import VueRouter from 'vue-router';

import AdRoute from './components/AdRoute';

// import Hello from './components/HelloWorld'

Vue.use(VueRouter)
Vue.config.productionTip = false

const scrollBehavior = function (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  } else {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
    return { x: 0, y: 0 }
  }
};

let router = new VueRouter({
  mode: 'history',
  base: __dirname,
  scrollBehavior,
});

router.addRoutes(AdRoute.routes());
console.log(router)

new Vue({
  router,
  template: `
  <div class="container-fluid">
    <router-view class="view"></router-view>
  </div>
  `,
}).$mount('#app');