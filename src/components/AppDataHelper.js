import { STATES, CATEGORIES, LOOKUPS, stateName, attributeIdLookup, attributeNameLookup, categoryNameLookup, attribute } from '../service/AppData'

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
                if (this.attributeType(name) === 'array') {
                    let value = this.ad.getAttribute(this.attributeId(name)).value
                    if (value) {
                        return value.split(',')
                    } else {
                        return []
                    }
                } else {
                    return this.ad.getAttribute(this.attributeId(name)).value
                }
            }
            return ''
        },
        attributeType(name) {
            let attr = attribute(this.attributeId(name))
            if (attr) {
                return attr.type
            }
            return ''
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