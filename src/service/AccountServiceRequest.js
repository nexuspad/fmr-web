import User from './model/User'

export default class AccountSerivceRequest {
    user
    agreeToTOS
    phoneNumber
    verificationCode
    newEmail
    newPassword

    static forLogin(email, password) {
        let request = new AccountSerivceRequest()
        let user = new User()
        user.email = email
        user.password = password
        request.user = user
        return request
    }

    static forRegistration(email, password) {
        let request = new AccountSerivceRequest()
        let user = new User()
        user.email = email
        user.password = password
        request.user = user
        return request
    }

    static forSendingVerification(phoneNumber) {
        let request = new AccountSerivceRequest()
        let user = new User()
        request.phoneNumber = phoneNumber
        request.user = user
        return request
    }

    static forVerification(code) {
        let request = new AccountSerivceRequest()
        request.verificationCode = code
        return request
    }

    static forUpdatePassword(password, newPassword) {
        let request = new AccountSerivceRequest()
        let user = new User()
        user.password = password
        request.user = user
        request.newPassword = newPassword
        return request
    }

    static forDeletaAccount(password) {
        let request = new AccountSerivceRequest()
        let user = new User()
        user.password = password
        request.user = user
        return request
    }
}