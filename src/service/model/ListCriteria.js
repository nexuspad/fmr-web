import AdCategory from './AdCategory'
import PropertyLocation from './PropertyLocation'
import AttributeFilter from './AttributeFilter'

export default class ListCriteria {
    status
    location
    category
    filters
    searchKeyword
    page
    countPerPage

    key

    constructor (jsonObj) {
        if (jsonObj) {
            this.status = jsonObj.status
            this.location = new PropertyLocation(jsonObj.location)
            this.category = new AdCategory(jsonObj.category)

            if (jsonObj.filters && jsonObj.filters.length > 0) {
                this.filters = []
                jsonObj.filters.forEach(element => {
                    this.filters.push(new AttributeFilter(element))
                });
            }

            this.searchKeyword = jsonObj.searchKeyword

            this.page = jsonObj.page
            this.countPerPage = jsonObj.countPerPage

            this.key = jsonObj.key
        }
    }

    addFilter (filter) {
        if (!this.filters) {
            this.filters = []
        }
        this.filters.push(filter)
    }
}