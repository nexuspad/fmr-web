export default class PropertyLocation {
    state
    city
    zipCode
    neighborhood

    constructor (jsonObj) {
        if (jsonObj) {
            this.state = jsonObj.state
            this.city = jsonObj.city
            this.zipCode = jsonObj.zipCode
            this.neighborhood = jsonObj.neighborhood
        }
    }
}