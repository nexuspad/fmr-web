import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import VueRouter from 'vue-router'
import vueHeadful from 'vue-headful'
import VueTextareaAutosize from 'vue-textarea-autosize';
import VueLazyload from 'vue-lazyload'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/custom.scss'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(VueCompositionApi)
Vue.use(VueRouter)
Vue.use(VueTextareaAutosize);
Vue.use(VueLazyload)

Vue.component('vue-headful', vueHeadful)

Vue.config.productionTip = false

import { router } from './router'
import TopNavigation from './components/TopNavigation'
import FmrFooter from './components/FmrFooter'

Vue.component('TopNavigation', TopNavigation)
Vue.component('FmrFooter', FmrFooter)

new Vue({
  router,
  template: `
  <div class="container-fluid">
    <top-navigation />
    <router-view></router-view>
    <fmr-footer />
  </div>
  `,
}).$mount('#app');
