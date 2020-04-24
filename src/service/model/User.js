export default class User {
    id
    email
    status
    token
    verification

    constructor (jsonObj) {
        if (jsonObj) {
            this.id = jsonObj.id
            this.email = jsonObj.email
            this.status = jsonObj.status
            this.token = jsonObj.token
        }
    }

    get token() {
        if (this.token) {
            return this.token
        }
        return ''
    }

    isVerified() {
        if (status === 1) {
            return true
        }
        return false
    }

    verificationCodeSent() {
        if (status === 2) {
            return true
        }
        return false
    }
}