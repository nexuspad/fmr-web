import AdHome from './AdHome'
import AdList from './AdList'
import AdView from './AdView'
import AdEdit from './AdEdit'

export default class AdRoute {
    static routes() {
        return [
            {
                path: '/:state?',
                name: 'adHome',
                component: AdHome,
                children: [
                    {
                        name: 'singleFamilyHomeForSale',
                        path: 'single-family-home-for-sale',
                        component: AdList
                    }
                ]
            },
            {
                path: '/ad/:id/view',
                component: AdView
            },
            {
                path: '/ad/new',
                component: AdEdit
            },
            {
                path: '/ad/:id/edit',
                component: AdEdit
            }
        ];
    }
}