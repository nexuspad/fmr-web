import User from './model/User'

export default class AccountSerivceRequest {
    user
    agreeToTOS
    verificationCode
    newEmail
    newPassword

    static forLogin (email, password) {
        let request = new AccountSerivceRequest()
        let user = new User()
        user.email = email
        user.password = password
        request.user = user
        return request
    }

    static forRegistration (email, password) {
        let request = new AccountSerivceRequest()
        let user = new User()
        user.email = email
        user.password = password
        request.user = user
        return request
    }
}