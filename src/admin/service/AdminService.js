import RestClient from '../../service/RestClient'
import User from '../../service/model/User'
import StorageUtils from '../../util/StorageUtil'
import FmrUtils from '../../util/FmrUtils'
import ApiError from '../../service/ApiError'
import AccountServiceRequest from '../../service/AccountServiceRequest'
import FmrAd from '../../service/model/FmrAd'
import ScoreCard from './ScoreCard'
import AdServiceRequest from '../../service/AdServiceRequest'
import AccountSerivceRequest from '../../service/AccountServiceRequest'

export default class AdminService {
    static _user = new User

    static getToken () {
        if (AdminService._user && AdminService._user.token) {
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
            RestClient.instance(token).get('/account/session')
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
                            let u = new User(element)
                            u.adminNote = element.adminNote
                            users.push(u)
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

    static getAds() {
        return new Promise((resolve, reject) => {
            AdminService.getToken().then((token) => {
                RestClient.instance(token).get('/admin/newposts')
                .then((response) => {
                    if (response.data) {
                        const ads = []
                        response.data.forEach(element => {
                            const ad = new FmrAd(element)
                            ad.scoreCard = new ScoreCard(element.scoreCardAdmin)
                            ad.owner = element.owner
                            ads.push(ad)
                        });
                        resolve(ads)
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
                AdminService.cleanup()
                reject(error)
            })
        })
    }

    static searchAds(adId, ownerEmail) {
        let uri = '/admin/search/post';
        if (adId) {
            uri = FmrUtils.addParamToUri(uri, 'adId', adId)
        }
        if (ownerEmail) {
            uri = FmrUtils.addParamToUri(uri, 'ownerEmail', ownerEmail)
        }

        return new Promise((resolve, reject) => {
            AdminService.getToken().then((token) => {
                RestClient.instance(token).get(uri)
                .then((response) => {
                    if (response.data) {
                        const ads = []
                        response.data.forEach(element => {
                            const ad = new FmrAd(element)
                            ad.scoreCard = new ScoreCard(element.scoreCardAdmin)
                            ad.owner = element.owner
                            ads.push(ad)
                        });
                        resolve(ads)
                    } else {
                        reject()
                    }
                })
                .catch((error) => {
                    console.error(error)
                    reject(error)
                })    
            })
            .catch((error) => {
                AdminService.cleanup()
                reject(error)
            })
        })
    }

    static toggleApproval(id, approve) {
        const serviceRequest = new AdServiceRequest
        if (approve) {
            serviceRequest.action = 'ADMIN_APPROVE'
        } else {
            serviceRequest.action = 'ADMIN_DISAPPROVE'
        }
        const ad = new FmrAd
        ad.id = id
        serviceRequest.ad = ad
        
        return new Promise((resolve, reject) => {
            AdminService.getToken().then((token) => {
                RestClient.instance(token).post('/admin/post/' + id, serviceRequest)
                .then((response) => {
                    if (response.data && response.data.code === 'SUCCESS') {
                        resolve()
                    } else {
                        reject()
                    }
                })
                .catch((error) => {
                    console.error('Ad service', error)
                    reject(error)
                })
            })
            .catch((error) => {
                reject(error)
                AdminService.cleanup()
            })
        })
    }

    static searchUser(userEmail) {
        return new Promise((resolve, reject) => {
            AdminService.getToken().then((token) => {
                RestClient.instance(token).get('/admin/search/user?email=' + userEmail)
                .then((response) => {
                    if (response.data) {
                        const user = new User(response.data)
                        user.adminNote = response.data.adminNote
                        resolve(user)
                    } else {
                        reject()
                    }
                })
                .catch((error) => {
                    console.error(error)
                    reject(error)
                })    
            })
            .catch((error) => {
                AdminService.cleanup()
                reject(error)
            })
        })
    }

    static jobsLog() {
        return new Promise((resolve, reject) => {
            AdminService.getToken().then((token) => {
                RestClient.instance(token).get('/admin/jobslog')
                .then((response) => {
                    if (response.data) {
                        resolve(response.data)
                    } else {
                        reject()
                    }
                })
                .catch((error) => {
                    console.error(error)
                    reject(error)
                })    
            })
            .catch((error) => {
                AdminService.cleanup()
                reject(error)
            })
        })
    }

    static toggleSuspension(userId, suspend) {
        const request = new AccountSerivceRequest
        if (suspend) {
            request.action = 'SUSPEND'
        } else {
            request.action = 'UN_SUSPEND'
        }

        let user = new User()
        user.id = userId
        request.user = user
        
        return new Promise((resolve, reject) => {
            AdminService.getToken().then((token) => {
                RestClient.instance(token).post('/admin/user/' + userId, request)
                .then((response) => {
                    if (response.data && response.data.code === 'SUCCESS') {
                        resolve()
                    } else {
                        reject()
                    }
                })
                .catch((error) => {
                    reject(error)
                })     
            })
            .catch((error) => {
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
        window.location = '/madmin/'
    }
}