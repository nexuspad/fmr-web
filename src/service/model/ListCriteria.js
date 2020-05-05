import AdCategory from './AdCategory'
import AttributeFilter from './AttributeFilter'

export default class ListCriteria {
    statuses
    category
    filters
    searchKeyword
    page
    countPerPage

    key

    constructor (jsonObj) {
        if (jsonObj) {
            this.statuses = jsonObj.statuses
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

    getKey() {
        if (this.key) {
            return this.key
        } else {
            let parts = []
            parts.push('list')

            if (this.category) {
                parts.push(this.category.id)
            }

            if (this.filters && this.filters.length) {
                this.filters.sort((attrFilterA, attrFilterB) => {
                    return attrFilterA.attribute.id - attrFilterB.attribute.id
                })
                this.filters.forEach((f) => {
                    if (f.key) {
                        parts.push(f.key)
                    }
                })
            }

            parts.push('p' + this.page)

            return parts.join('-')
        }
    }
}