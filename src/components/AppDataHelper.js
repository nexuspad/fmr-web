import { STATES, CATEGORIES, LOOKUPS, attributeIdLookup, attributeNameLookup, categoryNameLookup } from '../service/AppData'

export default {
    methods: {
        states() {
            return STATES
        },
        categoryName(id) {
            return categoryNameLookup(id)
        },
        categoryCode(categoryId) {
            let category = CATEGORIES[categoryId]
            if (category) {
                return category.code
            }
            return ''
        },
        attributeName(id) {
            let name = attributeNameLookup(id)
            if (!name) {
                console.error('Error finding the attribute name', id)
            }
            return name
        },
        attributeId(name) {
            let id = attributeIdLookup(name)
            if (!id) {
                console.error('Error finding the attribute id', name)
            }
            return id
        },
        lookup(name) {
            return LOOKUPS[name]
        },
        isHomeStyle(categoryId) {
            let code = this.categoryCode(categoryId)
            console.log('>>>>>>', categoryId, code)
            if (code.includes('family-home') || code.includes('townhome')) {
              return true
            }
            return false
        },
        isCondoStyle(categoryId) {
            let code = this.categoryCode(categoryId)
            if (code.includes('condominium') || code.includes('apartment')) {
              return true
            }
            return false
        }
    }
}