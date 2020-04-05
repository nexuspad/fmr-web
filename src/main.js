import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)
Vue.config.productionTip = false

import { router } from './router'

new Vue({
  router,
  template: `
  <div class="container-fluid">
    <router-view class="view"></router-view>
  </div>
  `,
}).$mount('#app');
