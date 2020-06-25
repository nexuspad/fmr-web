import linkifyHtml from 'linkifyjs/html'
import { allStatesOrTerritories, stateName, attributeIdLookup, attributeNameLookup, attributeOptionsLookup, categoryLookup, categoryNameLookup, attributeTypeLookup } from '../service/AppData'
import FmrUtil from '../util/FmrUtils'

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
})

export default {
    methods: {
        states() {
            return allStatesOrTerritories()
        },
        stateName(code) {
            return stateName(code)
        },
        categoryName(id) {
            if (id || id == 0)
                return FmrUtil.capitalizeFirstLetter(categoryNameLookup(id))
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
                    if (value !== null && typeof value !== 'undefined') {
                        if (typeof(value) === 'string') {
                            return value.length > 0 ? true : false
                        } else if (value instanceof Array) {
                            return value.length > 0 ? true : false
                        } else {
                            return true
                        }
                    }
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
            return category && category.code.includes('for-rent') ? true : false
        },
        isForSale(categoryId) {
            let category = categoryLookup(categoryId)
            return category && category.code.includes('for-sale') ? true : false
        },
        isResidential(categoryId) {
            let category = categoryLookup(categoryId)
            return category && category.code.includes('residential') ? true : false
        },
        isCommercial(categoryId) {
            let category = categoryLookup(categoryId)
            return category && category.code.includes('commercial') ? true : false
        },
        isLand(categoryId) {
            return categoryId == 3015 || categoryId == 3023 ? true : false
        },
        isVacation(categoryId) {
            return categoryId == 2011 ? true : false
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
        isSingleFamily(categoryId) {
            return categoryId == 3001 || categoryId == 3011 ? true : false
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
        isForeClosure(categoryId) {
            return categoryId == 3025 ? true : false
        },
        isByOwnerEligible(categoryId) {
            return [3001, 3002, 3004, 3029, 2011, 3011, 3012, 3013, 3014, 3015].includes(categoryId) ? true : false
        },
        addLineBreak(value) {
            return value.replace(/\n/g, '<br/>')
        },
        formatDate(aDate) {
            if (aDate instanceof Date) {
                return aDate.toLocaleDateString()
            }
            return aDate
        },
        dollar(amount) {
            return formatter.format(amount.replace(/[^0-9]/gi, ''))
        },
        convertLinks(description) {
            return linkifyHtml(description, {defaultProtocol: 'https'});
        }
    }
}