export default class AppEvent {
    static API_EVENT = 'Api event'

    static LOADING = 'LOADING';
    static TIMEOUT = 'TIMEOUT';
    static EMPTY_DATA = 'EMPTY_DATA';
    static UNKNOWN = 'UNKNOWN';
    static ABORT = 'ABORT';

    static ACCOUNT_REGISTRATION_FAILURE = 'Registration failed'
    static ACCOUNT_LOGIN_SUCCESS = 'ACCOUNT_LOGIN_SUCCESS'
    static ACCOUNT_LOGIN_FAILURE = 'Login error'
    static ACCOUNT_PASSWORD_UPDATE = 'The password is successfully updated'
    static ACCOUNT_PASSWORD_UPDATE_FAILURE = 'ACCOUNT_PASSWORD_UPDATE_FAILURE'
  
    static ACCT_AUTHENTICATION_FAILURE = 'Your session has timed out. Please re-login.'

    static AD_UPDATE = 'AD_UPDATE'
    static AD_ACTIVATION = 'AD_ACTIVATION'
    static AD_DEACTIVATION = 'AD_DEACTIVATION'
    static AD_EXTENSION = 'AD_EXTENSION'
    static AD_REMOVAL = 'AD_REMOVAL'

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