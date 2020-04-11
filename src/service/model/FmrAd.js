import AdAttribute from "./AdAttribute";
import AdPhoto from "./AdPhoto";

export default class FmrAd {
    id;
    status;
    owner;
    attributes = [];
    photos = []

    attributeMap = new Map

    constructor(jsonObj) {
        if (jsonObj) {
            this.id = jsonObj.id
            this.status = jsonObj.status
            if (jsonObj.attributes) {
                jsonObj.attributes.forEach(element => {
                    const attrObj = new AdAttribute(element)
                    this.attributes.push(attrObj)
                    this.attributeMap.set(attrObj.name, attrObj)
                });
            }

            if (jsonObj.photos) {
                jsonObj.photos.forEach(photoObj => {
                    this.photos.push(new AdPhoto(photoObj))
                })
            }
        }
    }

    getAttribute (name) {
        if (this.attributeMap.get(name)) {
            return this.attributeMap.get(name)
        } else {
            return AdAttribute.instance(name)
        }
    }
}