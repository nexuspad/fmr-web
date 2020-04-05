import Vue from 'vue'
import VueRouter from 'vue-router'

import AdRoute from './components/AdRoute'
import AccountRoute from './components/account/AccountRoute'

Vue.use(VueRouter)

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
  
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    scrollBehavior,
});

router.addRoutes(AdRoute.routes())
router.addRoutes(AccountRoute.routes())

export { router }
