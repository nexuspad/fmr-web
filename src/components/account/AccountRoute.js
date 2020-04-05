import Register from './Register'
import Login from './Login'
import Account from './Account'
import MyAds from './MyAds'

export default class AccountRoute {
    static routes() {
        return [
            {
                path: '/register',
                component: Register
            },
            {
                path: '/login',
                component: Login
            },
            {
                path: '/account',
                component: Account
            },
            {
                path: '/myads',
                component: MyAds
            }
        ];
    }
}