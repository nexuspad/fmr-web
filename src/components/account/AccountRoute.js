import Register from './Register'
import Login from './Login'
import Account from './Account'
import MyAds from './MyAds'

export default class AccountRoute {
    static routes() {
        return [
            {
                path: '/account',
                component: Account,
                children: [
                    {
                        path: 'register',
                        component: Register
                    },
                    {
                        path: 'login',
                        component: Login
                    },
                    {
                        path: 'myads',
                        component: MyAds
                    }
                ]
            }
        ]
    }
}