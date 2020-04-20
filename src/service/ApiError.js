// Error message for Rest API status code
const ApiErrorMessage = {
    ACCT_LOGIN_FAILED: 'Login failed. Invalid credentials.',
    DATA_ERROR_AD_NOT_FOUND: 'The ad cannot be found in the system.'
}

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