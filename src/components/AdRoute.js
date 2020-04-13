import AdHome from './AdHome'
import AdList from './AdList'
import AdView from './AdView'
import AdEdit from './AdEdit'
import { CATEGORY_URIS } from '../service/AppData'

export default class AdRoute {
    static routes() {
        return [
            {
                path: '/:state?',
                name: 'adHome',
                component: AdHome,
                children: AdRoute.categoryRoutes()
            },
            {
                path: '/ad/new',
                name: 'adNew',
                component: AdEdit
            },
            {
                path: '/ad/edit',
                name: 'adEdit',
                component: AdEdit
            },
            {
                path: '/ad/:id',
                name: 'adView',
                component: AdView
            }
        ];
    }

    static categoryRoutes () {
        let children = []
        for (let categoryId in CATEGORY_URIS) {
            children.push({
                name: CATEGORY_URIS[categoryId],
                path: CATEGORY_URIS[categoryId],
                component: AdList
            })
        }
        return children
    }
}