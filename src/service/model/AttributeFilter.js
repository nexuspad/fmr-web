import AdAttribute from "./AdAttribute"

export default class AttributeFilter {
    attribute
    operator
    value
    values
    minValue
    maxValue

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

    static in (name, values) {
        const filter = new AttributeFilter()
        filter.operator = 'IN'
        filter.attribute = new AdAttribute()
        filter.attribute.name = name
        filter.values = values
        return filter
    }

    static range (name, minValue, maxValue) {
        const filter = new AttributeFilter()
        filter.operator = 'RANGE'
        filter.attribute = new AdAttribute()
        filter.attribute.name = name
        filter.minValue = minValue
        filter.maxValue = maxValue
        return filter
    }

    static gt (name, value) {
        const filter = new AttributeFilter()
        filter.operator = 'GT'
        filter.attribute = new AdAttribute()
        filter.attribute.name = name
        filter.value = value
        return filter
    }

    static lt (name, value) {
        const filter = new AttributeFilter()
        filter.operator = 'LT'
        filter.attribute = new AdAttribute()
        filter.attribute.name = name
        filter.value = value
        return filter
    }

    paramExpression () {
        let value = null;

        if (this.operator === 'EQ' || this.operator === 'GT' || this.operator === 'LT') {
            value = this.value
        } else if (this.operator === 'IN') {
            if (this.values instanceof Array && this.values.length > 0) {
                value = this.values.join(',')
            }
        } else if (this.operator === 'RANGE') {
            value = this.minValue + '-' + this.maxValue
        }

        if (value !== null) {
            return this.operator + '(' + value + ')'
        }
    }
}