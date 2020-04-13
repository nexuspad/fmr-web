import { reactive } from '@vue/composition-api'
import EventManager from '../util/EventManager'
import { AppStatus } from '../service/AppCode'

export function formSetup () {
    const formState = reactive({
        posting: false
    })

    EventManager.subscribe(AppStatus.LOADING, submitting)

    function submitting(isLoading) {
        if (isLoading) {
            formState.posting = true
        } else {
            formState.posting = false
        }
    }

    return {
        formState,
        submitting
    }
}