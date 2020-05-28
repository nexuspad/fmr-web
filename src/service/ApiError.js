// Error message for Rest API status code
const ApiErrorMessage = {
    INTERNAL_ERROR: 'The system encountered some problem while performing this action. Please try again later.',
    ACCT_LOGIN_FAILED: 'Login failed. Invalid credentials.',
    ACCT_VERIFICATION_CODE_TOO_OLD: 'The verification code has expired.',
    ACCT_VERIFICATION_FAILED: 'The code cannot be verified.',
    ACCT_SUSPENDED: 'Your account has been suspended. Please contact us if you have any questions.',
    DATA_ERROR_AD_NOT_FOUND: 'The ad cannot be found in the system.',
    DATA_ERROR_MISSING_REQUIRED: 'Some required fields are missing.',
    DATA_ERROR_INVALID_INPUT: 'The input is invalid.',
    ACCT_AUTHENTICATION_FAILURE: 'Your login session has expired. <a href="/account/login">Re-login</a>.',
    ACCT_WRONG_PASSWORD: 'The account password is incorrect.',
    ACCT_INVALID_TOKEN: 'The reset key is invalid. Please try again.',
    ACCESS_DENIED: 'Access denied.',

    UPLOAD_FILE_NOT_SUPPORTED: 'The file is not a valid image. Only JPG, PNG and GIF files are allowed.'
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
        error.message = ApiErrorMessage['INTERNAL_ERROR']
        return error
    }

    static authenticationError() {
        const error = new ApiError
        error.code = 'ACCT_AUTHENTICATION_FAILURE'
        error.message = ApiErrorMessage[error.code]
        return error
    }

    static accessDenied() {
        const error = new ApiError
        error.code = 'ACCESS_DENIED'
        error.message = ApiErrorMessage[error.code]
        return error
    }
}