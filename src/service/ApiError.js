import { ApiErrorMessage } from './AppCode'

export default class ApiError {
    code
    message

    constructor (code) {
        this.code = code
        if (typeof(ApiErrorMessage[code]) !== 'undefined') {
            this.message = ApiErrorMessage[code]
        }
    }
}