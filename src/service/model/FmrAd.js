import AdCategory from './AdCategory'
import AdAttribute from "./AdAttribute"
import AdPhoto from "./AdPhoto"

export default class FmrAd {
    id = 0
    category
    status
    attributes = []
    photos = []

    uri = ''
    subTitle = ''

    postDate
    expiryDate
    updateTime
    updateTimeDisplay
    
    constructor(jsonObj) {
        if (jsonObj) {
            this.id = jsonObj.id
            this.category = new AdCategory(jsonObj.category)
            this.status = jsonObj.status

            this.expiryDate = Date.parse(jsonObj.expiryDate)
            this.updateTime = jsonObj.updateTime
            this.updateTimeDisplay = new Date(jsonObj.updateTime * 1000).toLocaleString("en-US")

            if (jsonObj.uri)
                this.uri = jsonObj.uri

            this.subTitle = jsonObj.subTitle

            if (jsonObj.attributes) {
                jsonObj.attributes.forEach(element => {
                    const attrObj = new AdAttribute(element)
                    this.attributes.push(attrObj)
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

    copy(otherAd) {
        this.id = otherAd.id
        this.status = otherAd.status
        this.postDate = otherAd.postDate
        this.expiryDate = otherAd.expiryDate
        this.updateTime = otherAd.updateTime
        this.updateTimeDisplay = otherAd.updateTimeDisplay

        if (otherAd.attributes) {
            while (this.attributes.length) {
                this.attributes.pop();
            }
            otherAd.attributes.forEach(element => {
                const attrObj = new AdAttribute(element)
                this.attributes.push(attrObj)
            })
        }
    }

    getAttribute (id) {
        let attr = AdAttribute.instance(id)
        this.attributes.forEach(attribute => {
            if (attribute.id == id) {
                attr = attribute
            }
        })
        return attr
    }

    get title() {
        return this.getAttribute(1).value
    }

    get description() {
        return this.getAttribute(2).value.replace(/\n/g, '<br/>')
    }

    get city() {
        return this.getAttribute(10).value
    }
    
    get state() {
        return this.getAttribute(12).value
    }

    get zipCode() {
        return this.getAttribute(33).value
    }

    isActive() {
        if (this.status === 'ACTIVE') {
            return true
        }
        return false
    }

    isDeactivated() {
        if (this.status === 'DEACTIVATED') {
            return true
        }
        return false
    }

    isExpired() {
        if (this.status === 'EXPIRED') {
            return true
        }
        return false
    }

    isDisapproved() {
        if (this.status === 'DISAPPROVED') {
            return true
        }
        return false
    }

    isUnderReview() {
        if (this.status === 'UNDER_REVIEW') {
            return true
        }
        return false
    }

    isDraft() {
        if (this.status === 'DRAFT') {
            return true
        }
        return false
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
            if (this.photos) {
                while (this.photos.length) {
                    this.photos.pop();
                }    
            }
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

    hasCoordinate() {
        let hasIt = false
        this.attributes.forEach(attribute => {
            if (attribute.id === 48 && attribute.value) {
                hasIt = true
            }
        })
        return hasIt
    }

    printSelf() {
        this.attributes.forEach(a => {
            console.log(a.id, a.name, a.value)
        })
    }
}