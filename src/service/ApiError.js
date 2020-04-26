// Error message for Rest API status code
const ApiErrorMessage = {
    INTERNAL_ERROR: 'Internal error',
    ACCT_LOGIN_FAILED: 'Login failed. Invalid credentials.',
    DATA_ERROR_AD_NOT_FOUND: 'The ad cannot be found in the system.',
    DATA_ERROR_MISSING_REQUIRED: 'Some required fields are missing',
    ACCT_AUTHENTICATION_FAILURE: 'Your login session has expired. <a href="/account/login">Re-login</a>.'
}

export default class ApiError {
    code
    message
    details

    constructor (code, details) {
        this.code = code
        if (typeof(ApiErrorMessage[code]) !== 'undefined') {
            this.message = ApiErrorMessage[code]
        }

        if (details) {
            this.details = details
        }
    }

    static internalError() {
        const error = new ApiError
        error.code = 'INTERNAL_ERROR'
        error.message = 'There is an internal error.'
        return error
    }

    static authenticationError() {
        const error = new ApiError
        error.code = 'ACCT_AUTHENTICATION_FAILURE'
        error.message = ApiErrorMessage[error.code]
        return error
    }
}