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
}