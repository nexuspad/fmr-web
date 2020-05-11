import { attributeTypeLookup } from '../../service/AppData'

export default class AdAttribute {
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

            if (attributeTypeLookup(this.id) === 'array') {
                if (!this.value) {
                    this.value = []
                } else {
                    if (typeof(this.value) === 'string') {
                        this.value = this.value.split(',')
                    }
                }
            }

        } else {
            this.options = []
        }
    }

    static instance (name) {
        const attribute = new AdAttribute
        attribute.name = name
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
}