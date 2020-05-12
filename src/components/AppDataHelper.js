import { allStatesOrTerritories, stateName, attributeIdLookup, attributeNameLookup, attributeOptionsLookup, categoryLookup, categoryNameLookup, attributeTypeLookup } from '../service/AppData'

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
            return allStatesOrTerritories()
        },
        stateName(code) {
            return stateName(code)
        },
        categoryName(id) {
            if (id)
                return this.capitalizeFirstLetter(categoryNameLookup(id))
            return ''
        },
        categoryCode(categoryId) {
            let category = categoryLookup(categoryId)
            if (category) {
                return category.code
            }
            return ''
        },
        categoryUri(categoryId) {
            let category = categoryLookup(categoryId)
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
                if (this.ad.getAttribute(this.attributeId(name))) {
                    let value = this.ad.getAttribute(this.attributeId(name)).value
                    if (value !== null && typeof value !== 'undefined' && value.length > 0)
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
            let category = categoryLookup(categoryId)
            if (category && category.code.includes('for-rent')) {
                return true
            }
            return false
        },
        isForSale(categoryId) {
            let category = categoryLookup(categoryId)
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
        isManufacturedHome(categoryId) {
            return categoryId == 3014 || categoryId == 3029 ? true : false
        },
        isApartment(categoryId) {
            return categoryId == 3003 ? true : false
        },
        isLand(categoryId) {
            return categoryId == 3015 || categoryId == 3023 ? true : false
        },
        isForeClosure(categoryId) {
            return categoryId == 3025 ? true : false
        },
        dollar(amount) {
            return formatter.format(amount)
        }
    }
}