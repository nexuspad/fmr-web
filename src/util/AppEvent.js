export default class AppEvent {
    static API_EVENT = 'Api event'

    static LOADING = 'LOADING'
    static TIMEOUT = 'TIMEOUT'
    static EMPTY_DATA = 'EMPTY_DATA'
    static UNKNOWN = 'UNKNOWN'
    static ABORT = 'ABORT'

    static GENERIC_MISSING_INPUT = 'GENERIC_MISSING_INPUT'

    static ACCOUNT_REGISTRATION_FAILURE = 'ACCOUNT_REGISTRATION_FAILURE'
    static ACCOUNT_LOGIN_SUCCESS = 'ACCOUNT_LOGIN_SUCCESS'
    static ACCOUNT_LOGIN_FAILURE = 'ACCOUNT_LOGIN_FAILURE'
    static ACCOUNT_PASSWORD_UPDATE = 'ACCOUNT_PASSWORD_UPDATE'
    static ACCOUNT_PASSWORD_UPDATE_FAILURE = 'ACCOUNT_PASSWORD_UPDATE_FAILURE'

    static ACCOUNT_REQUEST_RESET_PASSWORD_SUCCESS = 'ACCOUNT_REQUEST_RESET_PASSWORD_SUCCESS'
    static ACCOUNT_REQUEST_RESET_PASSWORD_FAILURE = 'ACCOUNT_REQUEST_RESET_PASSWORD_FAILURE'
    static ACCOUNT_RESET_PASSWORD_SUCCESS = 'ACCOUNT_REQUEST_RESET_PASSWORD_SUCCESS'
    static ACCOUNT_RESET_PASSWORD_FAILURE = 'ACCOUNT_RESET_PASSWORD_FAILURE'

    static ACCOUNT_VERIFICATION_CODE_SUCCESS = 'ACCOUNT_VERIFICATION_CODE_SUCCESS'
    static ACCOUNT_VERIFICATION_CODE_FAILURE = 'ACCOUNT_VERIFICATION_CODE_FAILURE'
    static ACCOUNT_VERIFICATION_SUCCESS = 'ACCOUNT_VERIFICATION_SUCCESS'
    static ACCOUNT_VERIFICATION_FAILURE = 'ACCOUNT_VERIFICATION_FAILURE'

    static ACCT_AUTHENTICATION_FAILURE = 'ACCT_AUTHENTICATION_FAILURE'
    static ACCOUNT_DELETION_SUCCESS = 'ACCOUNT_DELETION_SUCCESS'

    static AD_UPDATE_SUCCESS = 'AD_UPDATE_SUCCESS'
    static AD_UPDATE_FAILURE = 'AD_UPDATE_FAILURE'
    static AD_ACTIVATION_SUCCESS = 'AD_ACTIVATION_SUCCESS'
    static AD_ACTIVATION_FAILURE = 'AD_ACTIVATION_FAILURE'
    static AD_DEACTIVATION_SUCCESS = 'AD_DEACTIVATION_SUCCESS'
    static AD_DEACTIVATION_FAILURE = 'AD_DEACTIVATION_FAILURE'
    static AD_EXTENSION_SUCCESS = 'AD_EXTENSION_SUCCESS'
    static AD_EXTENSION_FAILURE = 'AD_EXTENSION_FAILURE'
    static AD_REMOVAL_SUCCESS = 'AD_REMOVAL_SUCCESS'
    static AD_REMOVAL_FAILURE = 'AD_REMOVAL_FAILURE'

    // the pre-defined AppEvent types
    type
    // Error object
    error

    message

    get message() {
        if (this.affectedItem) {
            return 'TODO'
        }
        return this.type
    }

    static ofSuccess(eventType, message) {
        let appEvent = new AppEvent();
        appEvent.type = eventType;
        appEvent.message = message;
        return appEvent;
    }

    static ofFailure(eventType, errorMessage) {
        let appEvent = new AppEvent();
        appEvent.type = eventType;
        appEvent.message = errorMessage
        return appEvent;
    }

    static ofApiFailure(error, affectedItem) {
        let appEvent = new AppEvent();
        appEvent.error = error;
        if (affectedItem) {
            appEvent.affectedItem = affectedItem;
        }
        return appEvent;
    }
}