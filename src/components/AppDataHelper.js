import { STATES, CATEGORIES, stateName, attributeIdLookup, attributeNameLookup, attributeOptionsLookup, categoryNameLookup, attributeTypeLookup } from '../service/AppData'

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
})

export default {
    methods: {
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        states() {
            return STATES
        },
        stateName(code) {
            return stateName(code)
        },
        categoryName(id) {
            return this.capitalizeFirstLetter(categoryNameLookup(id))
        },
        categoryCode(categoryId) {
            let category = CATEGORIES[categoryId]
            if (category) {
                return category.code
            }
            return ''
        },
        categoryUri(categoryId) {
            let category = CATEGORIES[categoryId]
            if (category) {
                return category.uri
            }
            return ''
        },
        attributeName(id) {
            let name = attributeNameLookup(id)
            if (!name) {
                console.error('Error finding the attribute name using the id: ', id)
            }
            return name
        },
        attributeId(name) {
            let id = attributeIdLookup(name)
            if (!id) {
                console.error('Error finding the attribute id using the name: ', name)
            }
            return id
        },
        hasAttributeValue(name) {
            if (this.ad) {
                if (this.ad.getAttribute(this.attributeId(name)).value) {
                    return true
                }
            }
            return false
        },
        attributeValue(name) {
            if (this.ad) {
                let value = this.ad.getAttribute(this.attributeId(name)).value
                if (this.attributeType(name) === 'array') {
                    if (value) {
                        return value
                    } else {
                        return []
                    }
                } else {
                    return value
                }
            }
            return ''
        },
        attributeType(name) {
            return attributeTypeLookup(this.attributeId(name))
        },
        attributeOptions(name) {
            let options = attributeOptionsLookup(this.attributeId(name))
            return options? options : []
        },
        isForRent(categoryId) {
            let category = CATEGORIES[categoryId]
            if (category && category.code.includes('for-rent')) {
                return true
            }
            return false
        },
        isForSale(categoryId) {
            let category = CATEGORIES[categoryId]
            if (category && category.code.includes('for-sale')) {
                return true
            }
            return false
        },
        isHomeStyle(categoryId) {
            let code = this.categoryCode(categoryId)
            if (!code) {
                return false
            }
            if (code.includes('family-home') || code.includes('townhome')) {
              return true
            }
            return false
        },
        isCondoStyle(categoryId) {
            let code = this.categoryCode(categoryId)
            if (!code) {
                return false
            }
            if (code.includes('condominium') || code.includes('apartment')) {
              return true
            }
            return false
        },
        isCondo(categoryId) {
            return categoryId == 3004 || categoryId == 3013 ? true : false
        },
        isApartment(categoryId) {
            return categoryId == 3003 ? true : false
        },
        dollar(amount) {
            return formatter.format(amount)
        }
    }
}