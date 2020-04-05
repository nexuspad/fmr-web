export default class FmrAd {
    id;
    status;
    owner;
    attributes;
    
    constructor(jsonObj) {
        if (jsonObj) {
            this.id = jsonObj.id
            this.status = jsonObj.status
            this.attributes = jsonObj.attributes
        }
    }
}