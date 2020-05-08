import AdAttribute from "./AdAttribute"

export default class AttributeFilter {
    attribute
    operator
    value

    constructor (jsonObj) {
        if (jsonObj) {
            this.attribute = new AdAttribute(jsonObj.attribute)
            this.operator = jsonObj.operator
            this.value = jsonObj.value
            this.values = jsonObj.values
            this.minValue = jsonObj.minValue
            this.maxValue = jsonObj.maxValue
        }
    }

    static eq (name, value) {
        const filter = new AttributeFilter()
        filter.operator = 'EQ'
        filter.attribute = new AdAttribute()
        filter.attribute.name = name
        filter.value = value
        return filter
    }

    static in (name, value) {
        const filter = new AttributeFilter()
        filter.operator = 'IN'
        filter.attribute = new AdAttribute()
        filter.attribute.name = name
        filter.value = value
        return filter
    }

    static range (name, value) {
        const filter = new AttributeFilter()
        filter.operator = 'RANGE'
        filter.attribute = new AdAttribute()
        filter.attribute.name = name
        filter.value = value
        return filter
    }

    paramExpression () {
        return this.operator + '.' + this.value
    }

    get key() {
        let key = ''
        if (this.attribute) {
            key += this.attribute.name + '.' + this.operator + '.' + this.value
        }
        return key.length > 0 ? key : null
    }
}