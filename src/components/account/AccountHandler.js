import { reactive } from '@vue/composition-api'
import AccountService from '../../service/AccountService';

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
        })
    }

    return {
        account,
        login
    }
}
