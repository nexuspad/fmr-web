import AdHome from './AdHome'
import AdList from './AdList'

export default class AdRoute {
    static routes() {
        return [
            {
                path: '/',
                component: AdHome,
                children: [
                    {
                        path: 'single-family-home-for-sale',
                        component: AdList
                    }
                ]
            }
        ];
    }
}