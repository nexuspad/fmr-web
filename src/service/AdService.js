import RestClient from './RestClient'
import AccountService from './AccountService'
import AdList from './model/AdList'
import FmrAd from './model/FmrAd'
import ApiError from './ApiError'
import FmrUtils from '../util/FmrUtils'
import PromiseManager from '../util/PromiseManager'

const AD_LISTING = 'posts'
const AD_VIEW = 'post/#Id'
const AD_TEMPLATE = 'account/post/template?categoryId=#CategoryId'
const AD_UPDATE = 'account/post/#Id'

export default class AdService {
    static _adList

    static getAds(listCriteria) {
        console.debug(listCriteria.getKey())

        if (AdService._adList) {
            if (AdService._adList.listCriteria.key == listCriteria.getKey()) {
                return new Promise((resolve) => {
                    resolve(AdService._adList)
                })
            }
        }

        let uri = AD_LISTING
        
        if (listCriteria.category) {
            uri = FmrUtils.addParamToUri(uri, 'categoryId', listCriteria.category.id)
        }

        if (listCriteria.page > 1) {
            uri = FmrUtils.addParamToUri(uri, 'page', listCriteria.page)
        }
        
        if (listCriteria.filters) {
            let filterJson = {}
            listCriteria.filters.forEach(filter => {
                filterJson[filter.attribute.name] = filter.paramExpression()
            });
            uri = FmrUtils.addParamToUri(uri, 'filters', JSON.stringify(filterJson))
        }

        return new Promise((resolve, reject) => {
            RestClient.instance().get(uri)
            .then((response) => {
                if (response.data && response.data.code === 'SUCCESS') {
                    AdService._adList = new AdList(response.data.adList);
                    resolve(AdService._adList)
                } else {
                    reject(new ApiError(response.data.code))
                }
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
        })
    }

    static adTemplate(categoryId) {
        let uri = AD_TEMPLATE.replace('#CategoryId', categoryId);
        return new Promise((resolve, reject) => {
            AccountService.getToken().then((token) => {
                RestClient.instance(token).get(uri)
                .then((response) => {
                    console.debug(response)
                    if (response.data && response.data.code === 'SUCCESS') {
                        resolve(new FmrAd(response.data.ad))
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
                console.error('Account service', error)
                reject(error)
            })
        })
    }

    static getAd(id, forEditing = false) {
        if (AdService._adList) {
            const ad = AdService._adList.getAd(id)
            if (ad) {
                return new Promise((resolve) => {
                    resolve(ad)
                })
            }
        }
        let uri = forEditing? AD_UPDATE.replace('#Id', id) : AD_VIEW.replace('#Id', id);

        if (forEditing) {
            return new Promise((resolve, reject) => {
                AccountService.getToken().then((token) => {
                    RestClient.instance(token).get(uri)
                    .then((response) => {
                        if (response.data && response.data.code === 'SUCCESS') {
                            resolve(new FmrAd(response.data.ad))
                        } else {
                            reject(new ApiError(response.data.code))
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                        reject(error)
                    })    
                })
                .catch((error) => {
                    console.error('Account service', error)
                    reject(error)
                })
            })    
        } else {
            return new Promise((resolve, reject) => {
                RestClient.instance(AccountService.currentUser().token).get(uri)
                .then((response) => {
                    if (response.data && response.data.code === 'SUCCESS') {
                        resolve(new FmrAd(response.data.ad))
                    } else {
                        reject(new ApiError(response.data.code))
                    }
                })
                .catch((error) => {
                    console.error(error)
                    reject(error)
                })
            })    
        }
    }

    static update(adServiceRequest, checkExistingRequest = true) {
        const serviceUri = AD_UPDATE.replace('#Id', adServiceRequest.ad.id)

        let p = null

        if (checkExistingRequest) {
            p = PromiseManager.get(serviceUri, 'POST')

            if (p) {
                console.debug('update in progress for ad: ' + adServiceRequest.ad.id)
                return p
            }
        }

        p = new Promise((resolve, reject) => {
            AccountService.getToken().then((token) => {
                RestClient.instance(token).post(serviceUri, adServiceRequest)
                .then((response) => {
                    if (response.data && response.data.code === 'SUCCESS') {
                        resolve(new FmrAd(response.data.ad))
                    } else {
                        reject(new ApiError(response.data.code, response.data.details))
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

        if (checkExistingRequest) {
            PromiseManager.set(p, serviceUri, 'POST');
        }

        return p
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            AccountService.getToken().then((token) => {
                RestClient.instance(token).delete(AD_UPDATE.replace('#Id', id))
                .then((response) => {
                    if (response.data && response.data.code === 'SUCCESS') {
                        resolve()
                    } else {
                        reject(new ApiError(response.data.code, response.data.details))
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

    static myAds() {
        return new Promise((resolve, reject) => {
            AccountService.getToken().then((token) => {
                RestClient.instance(token).get('/account/myposts')
                .then((response) => {
                    if (response.data && response.data.code === 'SUCCESS') {
                        resolve(new AdList(response.data.adList))
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
}