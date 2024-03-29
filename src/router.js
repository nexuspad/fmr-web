import VueRouter from 'vue-router'

import AdRoute from './components/AdRoute'
import AccountRoute from './components/account/AccountRoute'
import AppContext from './components/AppContext'
import MiscRoute from './components/misc/MiscRoute';

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

router.addRoutes(MiscRoute.routes())
router.addRoutes(AdRoute.routes())
router.addRoutes(AccountRoute.routes())

router.beforeEach((to, from, next) => {    
    // update app context
    AppContext.updateContext({routeParams: to.params, queryParams: to.query})

    // -- Inject meta heads
    // https://alligator.io/vuejs/vue-router-modify-head/

    // This goes through the matched routes from last to first, finding the closest route with a title.
    // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  
    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  
    // If a route with a title was found, set the document (page) title to that value.
    if(nearestWithTitle) document.title = nearestWithTitle.meta.title;
  
    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));
  
    // Skip rendering meta tags if there are none.
    if(!nearestWithMeta) return next();
  
    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map(tagDef => {
      const tag = document.createElement('meta');
  
      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });
  
      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute('data-vue-router-controlled', '');
  
      return tag;
    })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));
  
    next();
});

export { router }
