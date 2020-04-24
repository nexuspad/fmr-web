import Register from './Register'
import Login from './Login'
import ResetPassword from './ResetPassword'
import Account from './Account'
import Verification from './Verification'
import Settings from './Settings'
import MyAds from './MyAds'

export default class AccountRoute {
    static routes() {
        return [
            {
                path: '/account',
                name: 'Account',
                component: Account,
                children: [
                    {
                        path: 'register',
                        name: 'Register',
                        component: Register,
                        meta: {
                            title: 'Register an account - posting is free'
                        }
                    },
                    {
                        path: 'login',
                        name: 'Login',
                        component: Login,
                        meta: {
                            title: 'Log in to your account'
                        }
                    },
                    {
                        path: 'resetpassword',
                        name: 'ResetPassword',
                        component: ResetPassword,
                        meta: {
                            title: 'Reset account password'
                        }
                    },
                    {
                        path: 'sendverificationcode',
                        name: 'SendVerificationCode',
                        component: Verification,
                        meta: {
                            title: 'Account verification'
                        }
                    },
                    {
                        path: 'verify',
                        name: 'Verify',
                        component: Verification,
                        meta: {
                            title: 'Account verification'
                        }
                    },
                    {
                        path: 'settings',
                        name: 'Settings',
                        component: Settings,
                        meta: {
                            title: 'Account settings'
                        }
                    },
                    {
                        path: 'myads',
                        name: 'MyAds',
                        component: MyAds,
                        meta: {
                            title: 'My ads'
                        }
                    }
                ]
            }
        ]
    }
}