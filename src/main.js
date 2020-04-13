import Vue from 'vue'
// import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueCompositionApi from '@vue/composition-api'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/custom.scss'

Vue.use(VueCompositionApi)
// Vue.use(BootstrapVue)
// Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

import { router } from './router'

new Vue({
  router,
  template: `
  <div class="container-fluid">
    <router-view></router-view>
  </div>
  `,
}).$mount('#app');
