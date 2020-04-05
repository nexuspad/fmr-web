import { reactive } from '@vue/composition-api'

export function formSetup () {
    const formState = reactive({
        posting: false
    })

    function submitting () {
        formState.posting = true
    }

    return {
        formState,
        submitting
    }
}