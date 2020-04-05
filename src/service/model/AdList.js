import FmrAd from './FmrAd'
import ListCriteria from './ListCriteria'

export default class AdList {
    listCriteria
    ads = []

    constructor (jsonObj) {
        if (jsonObj) {
            this.listCriteria = new ListCriteria(jsonObj.listCriteria)
            if (jsonObj.ads) {
                jsonObj.ads.forEach(element => {
                    this.ads.push(new FmrAd(element))
                });
            }
        }
    }
}