import FmrObject from "./FmrObject"

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

    equals (location) {
        return FmrObject.isEqual(this.state, location.state) &&
            FmrObject.isEqual(this.city, location.city) &&
            FmrObject.isEqual(this.zipCode, location.zipCode) &&
            FmrObject.isEqual(this.neighborhood, location.neighborhood)
    }
}