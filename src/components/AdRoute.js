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
                component: AdHome,
                children: AdRoute.categoryRoutes()
            },
            {
                path: '/ad/new',
                name: 'AdNew',
                component: AdEdit
            },
            {
                path: '/ad/edit',
                name: 'AdEdit',
                component: AdEdit
            },
            {
                path: '/ad/:id',
                name: 'AdView',
                component: AdView,
                props: true
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