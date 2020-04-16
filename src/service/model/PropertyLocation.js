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

    get key() {
        let parts = [];
        if (this.state && this.state.length === 2) {
            parts.push(this.state)
        }
        if (this.city) {
            parts.push(this.city)
        }
        if (this.zipCode) {
            parts.push(this.zipCode)
        }
        if (this.neighborhood) {
            parts.push(this.neighborhood)
        }

        if (parts.length > 0) {
            return parts.join(',')
        }

        return null;
    }
}