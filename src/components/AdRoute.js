import AdList from './AdList'
import AdView from './AdView'
import AdEdit from './AdEdit'
import PlaceAd from './PlaceAd'

export default class AdRoute {
    static routes() {
        return [
            {
                path: '/placead',
                name: 'PlaceAd',
                component: PlaceAd,
                meta: {
                    title: 'Select a category',
                    activity: 'account'
                }
            },
            {
                path: '/ad/new',
                name: 'AdNew',
                component: AdEdit,
                meta: {
                    title: 'Add a new ad',
                    activity: 'editing'
                }
            },
            {
                path: '/ad/edit',
                name: 'AdEdit',
                component: AdEdit,
                meta: {
                    title: 'Update ad',
                    activity: 'editing'
                }
            },
            {
                path: '/ad/:id/:title?',
                name: 'AdView',
                component: AdView,
                props: true
            },
            {
                name: 'NewAds',
                path: '/',
                component: AdList,
                meta: {
                    title: 'Latest listings'
                }
            },
            {
                path: '/:state([a-z]{2})',
                component: AdList
            },
            {
                path: '/:categoryName',
                component: AdList
            },
            {
                path: '/:state([a-z]{2})/:categoryName',
                component: AdList
            }
        ];
    }
}