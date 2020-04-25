import RestClient from './RestClient'
import AccountServiceRequest from './AccountServiceRequest'
import User from './model/User'
import ApiError from './ApiError'
import StorageUtils from '../util/StorageUtil'
import AccountSerivceRequest from './AccountServiceRequest'

export default class AccountService {
    static _user = null

    static currentUser() {
        return this._user
    }

    static getToken () {
        if (AccountService._user) {
            return new Promise((resolve) => {
                resolve(AccountService._user.token)
            })
        } else {
            const token = StorageUtils.getFromSession('token')
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
                    StorageUtils.saveToSession('token', AccountService._user.token)
                    resolve(new User(response.data.user))
                } else {
                    reject(new ApiError(response.data.code))
                }
            })
            .catch((error) => {
                console.log(error)
                reject(new ApiError(error.response.status))
            })  
        })
    }

    static register (email, password) {
        return new Promise((resolve, reject) => {
            RestClient.instance().post('/register', AccountServiceRequest.forRegistration(email, password))
            .then((response) => {
                if (response.data && response.data.code === 'SUCCESS') {
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
        let serviceRequest = AccountServiceRequest.forSendingVerification(phoneNumber)
        return new Promise((resolve, reject) => {
            AccountService.getToken().then((token) => {
                RestClient.instance(token).post('/account/sendverificationcode', serviceRequest)
                .then((response) => {
                    if (response.data && response.data.code === 'SUCCESS') {
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
        let serviceRequest = AccountServiceRequest.forVerification(code)
        return new Promise((resolve, reject) => {
            AccountService.getToken().then((token) => {
                RestClient.instance(token).post('/account/verify', serviceRequest)
                .then((response) => {
                    if (response.data && response.data.code === 'SUCCESS') {
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
                    StorageUtils.saveToSession('token', AccountService._user.token)
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
        let serviceRequest = AccountSerivceRequest.forUpdatePassword(password, newPassword)
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

    static removeAccount(password) {
        let serviceRequest = AccountSerivceRequest.forDeletaAccount(password)
        return new Promise((resolve, reject) => {
            AccountService.getToken().then((token) => {
                RestClient.instance(token).post('/account/removeAccount', serviceRequest)
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

    static logout() {
        AccountService.cleanup()
    }

    static cleanup() {
        AccountService._user = null
        StorageUtils.deleteFromSession('token')
    }
}