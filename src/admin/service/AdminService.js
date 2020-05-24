import RestClient from '../../service/RestClient'
import User from '../../service/model/User'
import StorageUtils from '../../util/StorageUtil'
import ApiError from '../../service/ApiError'
import AccountServiceRequest from '../../service/AccountServiceRequest'

export default class AdminService {
    static _user = new User

    static getToken () {
        if (AdminService._user.token) {
            return new Promise((resolve) => {
                resolve(AdminService._user.token)
            })
        } else {
            const token = StorageUtils.getString('admin-token')
            if (token) {
                return new Promise((resolve, reject) => {
                    AdminService.current(token).then((userObj) => {
                        AdminService._user = userObj
                        resolve(AdminService._user.token)
                    }).catch(() => {
                        AdminService.cleanup()
                        reject(ApiError.authenticationError())
                    })
                })
            } else {
                return new Promise((resolve, reject) => {
                    AdminService.cleanup()
                    reject(ApiError.authenticationError())
                })    
            }
        }
    }

    static current(token) {
        return new Promise((resolve, reject) => {
            RestClient.instance(token).get('/admin/current')
            .then((response) => {
                if (response.data && response.data.code === 'SUCCESS') {
                    AdminService._user = new User(response.data.user)
                    StorageUtils.saveString('admin-token', AdminService._user.token)
                    resolve(new User(response.data.user))
                } else {
                    AdminService.cleanup()
                    reject(new ApiError(response.data.code))
                }
            })
            .catch((error) => {
                AdminService.cleanup()
                reject(error)
            })  
        })
    }

    static login (email, password) {
        return new Promise((resolve, reject) => {
            RestClient.instance().post('/login', AccountServiceRequest.forLogin(email, password))
            .then((response) => {
                if (response.data && response.data.code === 'SUCCESS') {
                    AdminService._user = new User(response.data.user)
                    StorageUtils.saveString('admin-token', AdminService._user.token)
                    resolve(new User(response.data.user))
                } else {
                    AdminService.cleanup()
                    reject(new ApiError(response.data.code))
                }
            })
            .catch((error) => {
                console.log(error)
                AdminService.cleanup()
                reject(error)
            })  
        })
    }

    static getUsers() {
        return new Promise((resolve, reject) => {
            AdminService.getToken().then((token) => {
                RestClient.instance(token).get('/admin/newusers')
                .then((response) => {
                    if (response.data) {
                        const users = []
                        response.data.forEach(element => {
                            users.push(new User(element))
                        });
                        resolve(users)
                    } else {
                        reject()
                    }
                })
                .catch((error) => {
                    console.error(error)
                    AdminService.cleanup()
                    reject(error)
                })    
            })
            .catch((error) => {
                console.error('Account service', error)
                AdminService.cleanup()
                reject(error)
            })
        })
    }

    static impersonate(email) {
        const request = AccountServiceRequest.forLogin(email, '')
        
        return new Promise((resolve, reject) => {
            AdminService.getToken().then((token) => {
                RestClient.instance(token).post('/admin/impersonate', request)
                .then((response) => {
                    if (response.data && response.data.code === 'SUCCESS') {
                        let user = new User(response.data.user)
                        StorageUtils.saveString('token', user.token)
                        resolve(new User(response.data.user))
                    } else {
                        let apiError = new ApiError(response.data.code)
                        reject(apiError.message)
                    }
                })
                .catch((error) => {
                    console.log(error)
                    AdminService.cleanup()
                    if (error instanceof ApiError)
                    reject(error.message)
                })     
            })
            .catch((error) => {
                console.error('Account service', error)
                AdminService.cleanup()
                reject(error)
            })
        })
    }

    static cleanup() {
        AdminService._user = null
        StorageUtils.delete('admin-token')
    }
}