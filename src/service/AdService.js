import RestClient from './RestClient'
import AccountService from './AccountService'
import AdList from './model/AdList'
import FmrAd from './model/FmrAd'
import ApiError from './ApiError'

const AD_LISTING = 'ads'
const AD_TEMPLATE = 'placead/template?categoryId=#CategoryId'
const AD_VIEW = 'ad?id=#Id'
const AD_EDIT = 'ad/edit?id=#Id'
const AD_UPDATE = 'account/updateAd'

export default class AdService {
    static _adList

    static getAds(listCriteria) {
        console.log('listkey:', listCriteria.getKey())

        if (AdService._adList) {
            if (AdService._adList.listCriteria.key == listCriteria.getKey()) {
                return new Promise((resolve) => {
                    resolve(AdService._adList)
                })
            }
        }

        let uri = AD_LISTING
        
        if (listCriteria.category) {
            uri = RestClient.addParamToUri(uri, 'categoryId', listCriteria.category.id)
        }
        
        if (listCriteria.location) {
            uri = RestClient.addParamToUri(uri, 'location', JSON.stringify(listCriteria.location))
        }

        if (listCriteria.filters) {
            let filterJson = {}
            listCriteria.filters.forEach(filter => {
                filterJson[filter.attribute.name] = filter.paramExpression()
            });
            uri = RestClient.addParamToUri(uri, 'filters', JSON.stringify(filterJson))
        }

        return new Promise((resolve, reject) => {
            RestClient.instance().get(uri)
            .then((response) => {
                if (response.data && response.data.code === 'SUCCESS') {
                    AdService._adList = new AdList(response.data.adList);
                    console.log(AdService._adList)
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
            RestClient.instance().get(uri)
            .then((response) => {
                console.log(response)
                if (response.data && response.data.code === 'SUCCESS') {
                    resolve(new FmrAd(response.data.ad))
                } else {
                    reject()
                }
            })
            .catch((error) => {
                console.error(error)
                reject()
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
        let uri = forEditing? AD_EDIT.replace('#Id', id) : AD_VIEW.replace('#Id', id);
        return new Promise((resolve, reject) => {
            RestClient.instance().get(uri)
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

    static update(adServiceRequest) {
        return new Promise((resolve, reject) => {
            AccountService.getToken().then((token) => {
                RestClient.instance(token).post(AD_UPDATE, adServiceRequest)
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
    }

    static submitAndActivate(adObj) {
        adObj.status = 'ACTIVE'
        AdService.update(adObj)
    }

    static myAds() {
        return new Promise((resolve, reject) => {
            AccountService.getToken().then((token) => {
                RestClient.instance(token).get('/account/myads')
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