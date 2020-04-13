import Register from './Register'
import Login from './Login'
import Account from './Account'
import MyAds from './MyAds'

export default class AccountRoute {
    static routes() {
        return [
            {
                path: '/account',
                name: 'account',
                component: Account,
                children: [
                    {
                        path: 'register',
                        name: 'register',
                        component: Register
                    },
                    {
                        path: 'login',
                        name: 'login',
                        component: Login
                    },
                    {
                        path: 'myads',
                        name: 'myAds',
                        component: MyAds
                    }
                ]
            }
        ]
    }
}