import User from './model/User'

export default class AccountSerivceRequest {
    user
    agreeToTOS
    phoneNumber
    verificationCode
    passwordResetKey
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

    static forSendingVerification(userId, phoneNumber) {
        let request = new AccountSerivceRequest()
        let user = new User()
        user.id = userId
        request.phoneNumber = phoneNumber
        request.user = user
        return request
    }

    static forVerification(userId, code) {
        let request = new AccountSerivceRequest()
        let user = new User()
        user.id = userId
        request.verificationCode = code
        request.user = user
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

    static forResetPasswordRequest(email) {
        let request = new AccountSerivceRequest()
        let user = new User()
        user.email = email
        request.user = user
        return request
    }

    static forResetPassword(key, newPassword) {
        let request = new AccountSerivceRequest()
        request.passwordResetKey = key
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