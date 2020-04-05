import AdCategory from './AdCategory'
import PropertyLocation from './PropertyLocation'

export default class ListCriteria {
    status
    location
    category
    filters
    searchKeyword

    page
    countPerPage

    constructor (jsonObj) {
        if (jsonObj) {
            this.status = jsonObj.status
            this.location = new PropertyLocation(jsonObj.location)
            this.category = new AdCategory(jsonObj.category)
            this.filters = jsonObj.filters
            this.searchKeyword = jsonObj.searchKeyword

            this.page = jsonObj.page
            this.countPerPage = jsonObj.countPerPage
        }
    }
}