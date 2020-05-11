import RestClient from '../../service/RestClient'
import User from '../../service/model/User'
import StorageUtils from '../../util/StorageUtil'
import ApiError from '../../service/ApiError'
import AccountSerivceRequest from '../../service/AccountServiceRequest'

export default class AdminService {
    static impersonate(email) {
        const request = AccountSerivceRequest.forLogin(email, '')
        
        return new Promise((resolve, reject) => {
            RestClient.instance().post('/admin/impersonate', request)
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
                if (error instanceof ApiError)
                reject(error.message)
            })  
        })
    }
}