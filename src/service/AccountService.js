import RestClient from './RestClient'
import User from './model/User'
import ApiError from './ApiError'
import StorageUtils from '../util/StorageUtil'
import AccountServiceRequest from './AccountServiceRequest'

export default class AccountService {
    static _user = User.visitor()

    static currentUser() {
        return this._user
    }

    static getToken () {
        if (AccountService._user.token) {
            return new Promise((resolve) => {
                resolve(AccountService._user.token)
            })
        } else {
            const token = StorageUtils.getString('token')
            if (token) {
                return new Promise((resolve, reject) => {
                    AccountService.current(token).then((userObj) => {
                        AccountService._user = userObj
                        resolve(AccountService._user.token)
                    }).catch(() => {
                        AccountService.cleanup()
                        reject(ApiError.authenticationError())
                    })
                })
            } else {
                return new Promise((resolve, reject) => {
                    AccountService.cleanup()
                    reject(ApiError.authenticationError())
                })    
            }
        }
    }

    static login (email, password) {
        return new Promise((resolve, reject) => {
            RestClient.instance().post('/login', AccountServiceRequest.forLogin(email, password))
            .then((response) => {
                if (response.data && response.data.code === 'SUCCESS') {
                    AccountService._user = new User(response.data.user)
                    StorageUtils.saveString('token', AccountService._user.token)
                    resolve(new User(response.data.user))
                } else {
                    reject(new ApiError(response.data.code))
                }
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })  
        })
    }

    static register (email, password) {
        return new Promise((resolve, reject) => {
            RestClient.instance().post('/register', AccountServiceRequest.forRegistration(email, password))
            .then((response) => {
                if (response.data && response.data.code === 'SUCCESS') {
                    AccountService._user = new User(response.data.user)
                    resolve(new User(response.data.user))
                } else {
                    reject(new ApiError(response.data.code))
                }
            })
            .catch((error) => {
                reject(new ApiError(error.response.status))
            })  
        })
    }

    static sendVerificationCode(phoneNumber) {
        return new Promise((resolve, reject) => {
            AccountService.getToken().then((token) => {
                let serviceRequest = AccountServiceRequest.forSendingVerification(AccountService.currentUser().id, phoneNumber)
                RestClient.instance(token).post('/account/sendverificationcode', serviceRequest)
                .then((response) => {
                    if (response.data && response.data.code === 'SUCCESS') {
                        AccountService._user = new User(response.data.user)
                        resolve(new User(response.data.user))
                    } else {
                        reject(new ApiError(response.data.code))
                    }
                })
                .catch((error) => {
                    console.error('Ad service', error)
                    reject(error)
                })
            })
            .catch((error) => {
                console.error('Account service', error)
                reject(error)
            })
        })
    }

    static verify(code) {
        return new Promise((resolve, reject) => {
            AccountService.getToken().then((token) => {
                let serviceRequest = AccountServiceRequest.forVerification(AccountService.currentUser().id, code)
                RestClient.instance(token).post('/account/verify', serviceRequest)
                .then((response) => {
                    if (response.data && response.data.code === 'SUCCESS') {
                        AccountService._user = new User(response.data.user)
                        resolve(new User(response.data.user))
                    } else {
                        reject(new ApiError(response.data.code))
                    }
                })
                .catch((error) => {
                    console.error('Ad service', error)
                    reject(error)
                })
            })
            .catch((error) => {
                console.error('Account service', error)
                reject(error)
            })
        })
    }

    static current(token) {
        return new Promise((resolve, reject) => {
            RestClient.instance(token).get('/account/session')
            .then((response) => {
                if (response.data && response.data.code === 'SUCCESS') {
                    AccountService._user = new User(response.data.user)
                    StorageUtils.saveString('token', AccountService._user.token)
                    resolve(new User(response.data.user))
                } else {
                    reject(new ApiError(response.data.code))
                }
            })
            .catch((error) => {
                reject(error)
            })  
        })
    }

    static changePassword(password, newPassword) {
        let serviceRequest = AccountServiceRequest.forUpdatePassword(password, newPassword)
        return new Promise((resolve, reject) => {
            AccountService.getToken().then((token) => {
                RestClient.instance(token).post('/account/updatePassword', serviceRequest)
                .then((response) => {
                    if (response.data && response.data.code === 'SUCCESS') {
                        AccountService._user = new User(response.data.user)
                        resolve(new User(response.data.user))
                    } else {
                        reject(new ApiError(response.data.code))
                    }
                })
                .catch((error) => {
                    reject(error)
                })  
            })
        })
    }

    static resetPasswordRequest(email) {
        let serviceRequest = AccountServiceRequest.forResetPasswordRequest(email)
        return new Promise((resolve, reject) => {
            RestClient.instance().post('/account/requestPasswordReset', serviceRequest)
            .then((response) => {
                if (response.data && response.data.code === 'SUCCESS') {
                    resolve()
                } else {
                    reject(new ApiError(response.data.code))
                }
            })
            .catch((error) => {
                reject(error)
            })  
        })
    }

    static resetPassword(key, newPassword) {
        let serviceRequest = AccountServiceRequest.forResetPassword(key, newPassword)
        return new Promise((resolve, reject) => {
            RestClient.instance().post('/account/resetPassword', serviceRequest)
            .then((response) => {
                if (response.data && response.data.code === 'SUCCESS') {
                    resolve()
                } else {
                    reject(new ApiError(response.data.code))
                }
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static removeAccount(password) {
        let serviceRequest = AccountServiceRequest.forDeletaAccount(password)
        return new Promise((resolve, reject) => {
            AccountService.getToken().then((token) => {
                RestClient.instance(token).post('/account/remove', serviceRequest)
                .then((response) => {
                    if (response.data && response.data.code === 'SUCCESS') {
                        resolve()
                    } else {
                        reject(new ApiError(response.data.code))
                    }
                })
                .catch((error) => {
                    reject(error)
                })  
            })
        })
    }

    static forceLogin({checkAuth: checkAuth, returnUrl: url}) {
        const kickToLogin = () => {
            if (url) {
                window.location = '/account/login?returnUrl=' + url
            } else {
                window.location = '/account/login'
            }
        }

        if (checkAuth) {
            const token = StorageUtils.getString('token')
            if (token) {
                AccountService.current(token).then(() => {
                }).catch(() => {
                    AccountService.cleanup()
                    kickToLogin()
                })
            } else {
                AccountService.cleanup()
                kickToLogin()
            }    
        } else {
            kickToLogin()
        }
    }

    static logout() {
        return new Promise((resolve, reject) => {
            AccountService.getToken().then((token) => {
                RestClient.instance(token).post('/account/logout')
                .then((response) => {
                    AccountService.cleanup()
                    if (response.data && response.data.code === 'SUCCESS') {
                        resolve()
                    } else {
                        reject()
                    }
                })
                .catch((error) => {
                    AccountService.cleanup()
                    reject(error)
                })    
            })
            .catch((error) => {
                AccountService.cleanup()
                reject(error)
            })
        })
    }

    static cleanup() {
        AccountService._user = User.visitor()
        StorageUtils.delete('token')
    }
}