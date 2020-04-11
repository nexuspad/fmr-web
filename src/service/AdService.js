import RestClient from './RestClient'
import AdList from './model/AdList'
import FmrAd from './model/FmrAd'

const AD_LISTING = 'ads'
const AD_TEMPLATE = 'placead/template?categoryId=#CategoryId'
const AD_ENTRY = 'ad?id=#Id'

export default class AdService {
    static getAds(listCriteria) {
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
            console.log('>>>>', filterJson)
            uri = RestClient.addParamToUri(uri, 'filters', JSON.stringify(filterJson))
            console.log('....', uri)
        }

        return new Promise((resolve, reject) => {
            RestClient.instance().get(uri)
            .then((response) => {
                console.log(response)
                if (response.data && response.data.code === 'SUCCESS') {
                    resolve(new AdList(response.data.adList))
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

    static getAd(id) {
        let uri = AD_ENTRY.replace('#Id', id);
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

    static update (adObj) {
        let uri = AD_ENTRY.replace('#Id', adObj.id);
        RestClient.instance().post(uri)
        .then((data) => {
            console.log(data);
        });
    }
}