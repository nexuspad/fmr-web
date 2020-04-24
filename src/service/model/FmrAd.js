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

            if (jsonObj.attributes) {
                jsonObj.attributes.forEach(element => {
                    const attrObj = new AdAttribute(element)
                    this.attributes.push(attrObj)
                    this.attributeMap.set(attrObj.id, attrObj)
                })
            }

            if (jsonObj.photos) {
                jsonObj.photos.forEach(photoObj => {
                    this.photos.push(new AdPhoto(photoObj))
                    this.photos.sort((a, b) => parseInt(a.displayOrder) - parseInt(b.displayOrder))
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

    addPhoto(photoObj) {
        if (!this.photos) {
            this.photos = []
        }
        this.photos.push(photoObj)
    }

    mergePhotos(updatedAd) {
        if (!updatedAd.photos || updatedAd.photos.length === 0) {
            return
        }

        if (!this.photos) {
            this.photos = []
            this.photos.push(...updatedAd.photos)
            this.photos.sort((a, b) => parseInt(a.displayOrder) - parseInt(b.displayOrder))

        } else {
            // delete the existing ones that are not in the new photos
            let viewIdsToDelete = []
            this.photos.forEach((p) => {
                if (!updatedAd._hasPhoto(p)) {
                    viewIdsToDelete.push(p.viewId)
                }
            })
            for (let i=this.photos.length-1; i>=0; i--) {
                if (viewIdsToDelete.indexOf(this.photos[i].viewId) !== -1) {
                    this.photos.splice(i, 1)
                }
            }

            // go through the new ones, update the display order or add
            let newPhotos = []
            updatedAd.photos.forEach((p) => {
                let isNewPhoto = true
                for (let i=0; i<this.photos.length; i++) {
                    if (this.photos[i].viewId === p.viewId) {
                        isNewPhoto = false
                        this.photos[i].displayOrder = p.displayOrder
                    }
                }
                if (isNewPhoto) {
                    newPhotos.push(p)
                }
            })

            this.photos.push(...newPhotos)
            this.photos.sort((a, b) => parseInt(a.displayOrder) - parseInt(b.displayOrder))
        }
    }

    deletePhotos(photos) {
        if (!this.photos) {
            this.photos = []
            this.photos.push(...photos)
        } else {
            photos.forEach((p) => {
                if (!this._hasPhoto(p)) {
                    this.photos.push(p)
                }
            })
        }
    }

    getPhotos() {
        return this.photos
    }

    _hasPhoto(photo) {
        if (!this.photos) {
            return false
        } else {
            for (let i=0; i<this.photos.length; i++) {
                if (this.photos[i].viewId === photo.viewId) {
                    return true
                }
            }
        }
        return false
    }
}