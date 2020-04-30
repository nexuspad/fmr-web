import AdHome from './AdHome'
import AdList from './AdList'
import AdView from './AdView'
import AdEdit from './AdEdit'
import PlaceAd from './PlaceAd'

import { CATEGORIES } from '../service/AppData'

export default class AdRoute {
    static routes() {
        return [
            {
                path: '/placead',
                name: 'PlaceAd',
                component: PlaceAd,
                meta: {
                    title: 'Select a category'
                }
            },
            {
                path: '/ad/new',
                name: 'AdNew',
                component: AdEdit,
                meta: {
                    title: 'Add a new ad'
                }
            },
            {
                path: '/ad/edit',
                name: 'AdEdit',
                component: AdEdit,
                meta: {
                    title: 'Update ad'
                }
            },
            {
                path: '/ad/:id/:title?',
                name: 'AdView',
                component: AdView,
                props: true
            },
            {
                path: '/:state?',
                component: AdHome,
                children: AdRoute.categoryRoutes()
            }
        ];
    }

    static categoryRoutes () {
        let children = []
        children.push(
            {
                name: 'NewAds',
                path: '/',
                component: AdList,
                meta: {
                    title: 'Latest listings'
                }
            }
        )

        for (let categoryId in CATEGORIES) {
            children.push({
                name: CATEGORIES[categoryId].id,
                path: '/:state?/' + CATEGORIES[categoryId].uri,
                component: AdList
            })
        }

        return children
    }
}