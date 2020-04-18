import AdCategory from './AdCategory'
import AdAttribute from "./AdAttribute"
import AdPhoto from "./AdPhoto"

export default class FmrAd {
    id
    category
    status
    owner
    attributes = []
    photos = []

    attributeMap = new Map

    constructor(jsonObj) {
        if (jsonObj) {
            this.id = jsonObj.id
            this.category = new AdCategory(jsonObj.category)
            this.status = jsonObj.status

            const self = this
            if (jsonObj.attributes) {
                jsonObj.attributes.forEach(element => {
                    const attrObj = new AdAttribute(element)
                    self.attributes.push(attrObj)
                    self.attributeMap.set(attrObj.id, attrObj)
                })
            }

            if (jsonObj.photos) {
                jsonObj.photos.forEach(photoObj => {
                    self.photos.push(new AdPhoto(photoObj))
                })
            }
        }
    }

    getAttribute (id) {
        if (this.attributeMap.has(id)) {
            return this.attributeMap.get(id)
        } else {
            return AdAttribute.instance(id)
        }
    }

    get title() {
        return this.getAttribute(1).value
    }

    get description() {
        return this.getAttribute(2).value
    }

    get city() {
        return this.getAttribute(10).value
    }
    
    get state() {
        return this.getAttribute(12).value
    }

    attributesTodisplay() {
        let items = []
        this.attributes.forEach((attr) => {
            if (attr.id !== 1 && attr.id !== 2) {
                items.push(attr)
            }
        })
        return items
    }

    get categoryId() {
        if (this.category) {
            return this.category.id
        }
        return 0
    }

    get thumbnailUrl() {
        if (this.photos.length > 0) {
            return this.photos[0].url
        }
        return false
    }
}