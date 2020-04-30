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
                            title: 'Register an account - posting is free',
                            redirectIfLoggedIn: true
                        }
                    },
                    {
                        path: 'login',
                        name: 'Login',
                        component: Login,
                        meta: {
                            title: 'Log in to your account',
                            redirectIfLoggedIn: true
                        }
                    },
                    {
                        path: 'requestpasswordreset',
                        name: 'RequestPasswordReset',
                        component: ResetPassword,
                        meta: {
                            title: 'Request account password reset',
                            redirectIfLoggedIn: true
                        }
                    },
                    {
                        path: 'resetpassword',
                        name: 'ResetPassword',
                        component: ResetPassword,
                        meta: {
                            title: 'Reset account password',
                            redirectIfLoggedIn: true
                        }
                    },
                    {
                        path: 'verify',
                        name: 'Verify',
                        component: Verification,
                        meta: {
                            title: 'Account verification',
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'settings',
                        name: 'Settings',
                        component: Settings,
                        meta: {
                            title: 'Account settings',
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'myads',
                        name: 'MyAds',
                        component: MyAds,
                        meta: {
                            title: 'My ads',
                            requiresAuth: true
                        }
                    }
                ]
            }
        ]
    }
}