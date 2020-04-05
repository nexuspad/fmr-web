import RestClient from './RestClient'
import AdList from './model/AdList'

const AD_LISTING = 'ads'
const AD_TEMPLATE = 'template?categoryId=#CategoryId'
const AD_UPDATE = 'ad?id=#Id'

export default class AdService {
    static getAds(listCriteria) {
        let uri = AD_LISTING
        
        if (listCriteria.category) {
            uri = RestClient.addParamToUri(uri, 'categoryId', listCriteria.category.id)
        }
        
        if (listCriteria.location) {
            uri = RestClient.addParamToUri(uri, 'location', JSON.stringify(listCriteria.location))
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
        RestClient.instance().get(uri)
        .then((data) => {
            console.log(data);
        });
    }

    static update (adObj) {
        let uri = AD_UPDATE.replace('#Id', adObj.id);
        RestClient.instance().post(uri)
        .then((data) => {
            console.log(data);
        });
    }
}