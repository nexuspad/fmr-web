import RestClient from './RestClient'
import AccountServiceRequest from './AccountServiceRequest'
import User from './model/User'
import AppError from './AppError'

export default class AccountService {
    static _user;

    static getToken () {
    }

    static login (email, password) {
        return new Promise((resolve, reject) => {
            RestClient.instance().post('/login', AccountServiceRequest.forLogin(email, password))
            .then((response) => {
                console.log(response)
                if (response.data && response.data.code === 'SUCCESS') {
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
                console.log(response)
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
}