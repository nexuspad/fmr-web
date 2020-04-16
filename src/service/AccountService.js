import RestClient from './RestClient'
import AccountServiceRequest from './AccountServiceRequest'
import User from './model/User'
import AppError from './AppError'
import StorageUtils from '../util/StorageUtil'

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
                return new Promise((resolve) => {
                    AccountService.current(token).then((userObj) => {
                        AccountService._user = userObj
                        resolve(AccountService._user.token)
                    }).catch(() => {
                        AccountService.cleanup()
                        resolve(false)
                    })
                })
            } else {
                return new Promise((resolve) => {
                    AccountService.cleanup()
                    resolve(false)
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
                    reject(new AppError(response.data.code))
                }
            })
            .catch((error) => {
                console.log(error)
                reject(new AppError(error.response.status))
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
                    reject(new AppError(response.data.code))
                }
            })
            .catch((error) => {
                reject(new AppError(error.response.status))
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
                    reject(new AppError(response.data.code))
                }
            })
            .catch((error) => {
                reject(new AppError(error.response.status))
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