import { attributeTypeLookup } from '../../service/AppData'

export default class AdAttribute {
    static GEO_COORDINATES = 48

    id
    name
    value
    options
    required

    constructor (jsonObj) {
        if (jsonObj) {
            this.id = jsonObj.id
            this.name = jsonObj.name
            this.value = jsonObj.value
            this.options = jsonObj.options
            this.required = jsonObj.required

            // normalize the value to empty string
            if (this.value === null || typeof this.value === 'undefined') {
                this.value = ''
            }

            if (attributeTypeLookup(this.id) === 'json') {
                if (this.value && typeof(this.value) === 'string') {
                    this.value = JSON.parse(this.value)
                }
            }

            if (attributeTypeLookup(this.id) === 'array') {
                if (!this.value) {
                    this.value = []
                } else {
                    if (typeof(this.value) === 'string') {
                        this.value = this.value.split(',')
                    }
                }
            } else if (attributeTypeLookup(this.id) === 'date' && typeof(this.value) === 'string') {
                let parts = this.value.split('-')
                if (parts.length == 3) {
                    this.value = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]))
                }
            }

        } else {
            this.options = []
        }
    }

    static instance (id) {
        const attribute = new AdAttribute
        attribute.id = id
        attribute.value = ''
        return attribute
    }

    // Normalize and set the value
    setValue(value) {
        let type = attributeTypeLookup(this.id)
        if (type === 'array' && value instanceof Array) {
            this.value = value.join(',')
        } else {
            this.value = value
        }
    }

    isSystemGenerated() {
        if (this.id === AdAttribute.GEO_COORDINATES) {
            return true
        }
        return false
    }
}