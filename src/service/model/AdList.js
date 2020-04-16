import FmrAd from './FmrAd'
import ListCriteria from './ListCriteria'

export default class AdList {
    listCriteria
    ads = []
    pages = []

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

    merge (otherList) {
        if (this.listCriteria.key === otherList.listCriteria.key) {
            if (this.pages.indexOf(otherList.listCriteria.page) === -1) {
                this.pages.push(otherList.listCriteria.page)
                this.ads.push(...otherList.ads)
            }
        } else {
            throw 'Not able to merge the list'
        }
    }

    getAd(id) {
        const ad = this.ads.find((item) => {
            return item.id == id
        })
        return ad
    }

    getPage (page) {
        if (this.pages.indexOf(page) !== -1) {
            let i = this.pages.indexOf(page)
            return this.ads.slice(i*this.listCriteria.countPerPage, (i+1)*this.listCriteria.countPerPage)
        }
    }
}