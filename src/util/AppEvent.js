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
  
    static ACCT_AUTHENTICATION_FAILURE = 'Your session has timed out. Please re-login.'

    // the pre-defined AppEvent types
    type
    // Error object
    error
    // affected object. this can be an NPEntry, NPFolder
    affectedItem

    get message() {
        if (this.affectedItem) {
            return 'TODO'
        }
        return this.type
    }

    static ofIntention(eventType, param) {
        let appEvent = new AppEvent();
        appEvent.type = eventType;
        appEvent.affectedItem = param;
        return appEvent;
    }

    static ofSuccess(eventType, affectedItem) {
        let appEvent = new AppEvent();
        appEvent.type = eventType;
        appEvent.affectedItem = affectedItem;
        return appEvent;
    }

    static ofFailure(eventType, errorMessage) {
        let appEvent = new AppEvent();
        appEvent.type = eventType;
        appEvent.error = errorMessage
        return appEvent;
    }

    static ofInformation(eventType, message) {
        let appEvent = new AppEvent();
        appEvent.type = eventType;
        if (message) {
            appEvent.message = message;
        } else {
            switch (eventType) {
                case this.EMPTY_LIST:
                    appEvent.message = 'Nothing in here';
            }
        }
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