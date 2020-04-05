import { ApiErrorMessage } from './AppCode'

export default class AppError {
    code
    message

    constructor (code) {
        this.code = code
        if (typeof(ApiErrorMessage[code]) !== 'undefined') {
            this.message = ApiErrorMessage[code]
        }
    }
}