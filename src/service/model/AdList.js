import FmrAd from './FmrAd'
import ListCriteria from './ListCriteria'

export default class AdList {
    listCriteria
    ads = []
    totalCount
    pages = []

    constructor (jsonObj) {
        if (jsonObj) {
            this.listCriteria = new ListCriteria(jsonObj.listCriteria)
            if (jsonObj.ads) {
                jsonObj.ads.forEach(element => {
                    this.ads.push(new FmrAd(element))
                })
            }
            this.totalCount = jsonObj.totalCount
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

    totalPages () {
        if (this.listCriteria && this.listCriteria.countPerPage > 0) {
          return Math.ceil(this.totalCount / this.listCriteria.countPerPage);
        }
        return 1;
    }
}