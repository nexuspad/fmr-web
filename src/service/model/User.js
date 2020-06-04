export default class User {
    id
    email
    status
    token
    lastActivity
    verification

    constructor (jsonObj) {
        if (jsonObj) {
            this.id = jsonObj.id
            this.email = jsonObj.email
            this.status = jsonObj.status
            this.token = jsonObj.token
            this.lastActivity = jsonObj.lastActivity
        }
    }

    static visitor() {
        const user = new User
        user.id = 0
        user.status = ''
        user.token = false
        return user
    }

    get token() {
        if (this.token) {
            return this.token
        }
        return ''
    }

    isVerified() {
        if (this.status === 'VERIFIED') {
            return true
        }
        return false
    }

    isSuspended() {
        if (this.status === 'SUSPENDED') {
            return true
        }
        return false
    }

    verificationCodeSent() {
        if (this.status === 'VERIFICATION_SENT') {
            return true
        }
        return false
    }
}