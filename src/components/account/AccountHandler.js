import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
Vue.use(VueCompositionApi)

import { ref, reactive } from '@vue/composition-api'
import AccountService from '../../service/AccountService'
import EventManager from '../../util/EventManager'
import AppEvent from '../../util/AppEvent'

const isLoggedIn = ref(false)

export function accountSetup (needToBeLoggedIn = false) {
    const account = reactive({
        email: '',
        password: ''
    })

    if (isLoggedIn.value === false) {
        AccountService.getToken().then((token) => {
            if (token) {
                isLoggedIn.value = true
            } else {
                isLoggedIn.value = false
                if (needToBeLoggedIn) {
                    kickToLogin()
                }
            }
        })    
    }

    function login ($event) {
        if ($event) {
            $event.preventDefault();
        }

        AccountService.login(account.email, account.password)
        .then((user) => {
            console.log(user)
            // router.push({ name: 'MyAds' });
            isLoggedIn.value = true
            // router.go('/account/myads');
            window.location.href = '/account/myads'
        })
        .catch((error) => {
            console.error(error)
            EventManager.publishApiEvent(AppEvent.ofApiFailure(error));
        })
    }

    function logout() {
        AccountService.logout()
        window.location.href = '/'
    }

    function kickToLogin() {
        console.log('go to login page...')
        window.location.href = '/account/login'
    }

    return {
        account,
        isLoggedIn,
        login,
        logout,
        kickToLogin
    }
}
