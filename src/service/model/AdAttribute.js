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

            // do not show 0 in the form
            if (this.value === 0) {
                this.value = ''
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
}