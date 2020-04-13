import { reactive } from '@vue/composition-api'
import AccountService from '../../service/AccountService'
import EventManager from '../../util/EventManager'
import AppEvent from '../../util/AppEvent'

export function accountSetup () {
    const account = reactive({
        email: '',
        password: ''
    })

    function login ($event) {
        if ($event) {
            $event.preventDefault();
        }

        AccountService.login(account.email, account.password)
        .then((user) => {
            console.log(user)
        })
        .catch((error) => {
            console.error(error)
            EventManager.publishApiEvent(AppEvent.ofApiFailure(error));
        })
    }

    return {
        account,
        login
    }
}
