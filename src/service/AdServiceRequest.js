import FmrAd from "./model/FmrAd"
import AdAttribute from './model/AdAttribute'
import AdCategory from './model/AdCategory'
import AdPhoto from './model/AdPhoto'

export default class AdServiceRequest {
    action
    ad

    static buildRequest(adObj) {
        if (!adObj.id) {
            return AdServiceRequest.newAd(adObj)
        } else {
            return AdServiceRequest.fullUpdate(adObj)
        }
    }

    static newAd(adObj) {
        const serviceRequest = new AdServiceRequest
        serviceRequest.action = 'NEW'
        serviceRequest.copyVerify(adObj)
        return serviceRequest
    }

    static fullUpdate(adObj) {
        const serviceRequest = new AdServiceRequest
        serviceRequest.action = 'UPDATE_ALL'
        serviceRequest.copyVerify(adObj)
        return serviceRequest
    }

    static submit(adObj) {
        const serviceRequest = new AdServiceRequest
        serviceRequest.action = 'SUBMIT'
        serviceRequest.copyVerify(adObj)
        return serviceRequest
    }

    static activate(adObj) {
        const serviceRequest = new AdServiceRequest
        serviceRequest.action = 'ACTIVATE'
        const ad = new FmrAd
        ad.id = adObj.id
        serviceRequest.ad = ad
        return serviceRequest
    }

    static deActivate(adObj) {
        const serviceRequest = new AdServiceRequest
        serviceRequest.action = 'DEACTIVATE'
        const ad = new FmrAd
        ad.id = adObj.id
        serviceRequest.ad = ad
        return serviceRequest
    }

    static extention(adObj) {
        const serviceRequest = new AdServiceRequest
        serviceRequest.action = 'EXTEND'
        const ad = new FmrAd
        ad.id = adObj.id
        serviceRequest.ad = ad
        return serviceRequest
    }

    static remove(adObj) {
        const serviceRequest = new AdServiceRequest
        serviceRequest.action = 'REMOVE'
        const ad = new FmrAd
        ad.id = adObj.id
        serviceRequest.ad = ad
        return serviceRequest
    }

    static cloudUploadAccess(id, fileName) {
        const serviceRequest = new AdServiceRequest
        serviceRequest.action = 'CLOUD_UPLOAD_ACCESS'

        const ad = new FmrAd
        ad.id = id
        const photo = new AdPhoto
        photo.adId = id
        photo.fileName = fileName
        ad.addPhoto(photo)
  
        serviceRequest.ad = ad

        return serviceRequest
    }

    static addPhoto(id, fileName, key) {
        const serviceRequest = new AdServiceRequest
        serviceRequest.action = 'ADD_PHOTO'

        const ad = new FmrAd
        ad.id = id
        const photo = new AdPhoto
        photo.adId = id
        photo.fileName = fileName
        photo.key = key
        ad.addPhoto(photo)
  
        serviceRequest.ad = ad

        return serviceRequest
    }

    static updatePhotoTitle(adId, viewId, title) {
        const ad = new FmrAd
        ad.id = adId
        const photo = new AdPhoto
        photo.adId = adId
        photo.viewId = viewId
        photo.title = title
        ad.addPhoto(photo)
  
        const serviceRequest = new AdServiceRequest
        serviceRequest.action = 'UPDATE_PHOTO_TITLE'
        serviceRequest.ad = ad
        return serviceRequest
    }

    static deletePhoto(adId, viewId) {
        const ad = new FmrAd
        ad.id = adId
        const photo = new AdPhoto
        photo.adId = adId
        photo.viewId = viewId
        ad.addPhoto(photo)
  
        const serviceRequest = new AdServiceRequest
        serviceRequest.action = 'DELETE_PHOTO'
        serviceRequest.ad = ad
        return serviceRequest
    }

    static reorderPhotos(adId, viewIdInOrders) {
        const ad = new FmrAd
        ad.id = adId
        ad.photos = []
        for (let i = 0; i<viewIdInOrders.length; i++) {
          let photo = new AdPhoto
          photo.adId = adId
          photo.viewId = viewIdInOrders[i]
          photo.displayOrder = i + 1
          ad.photos.push(photo)
        }
  
        const serviceRequest = new AdServiceRequest
        serviceRequest.action = 'ORDER_PHOTOS'
        serviceRequest.ad = ad
        return serviceRequest
    }

    copyVerify(adObj) {
        this.ad = new FmrAd
        this.ad.id = adObj.id
        this.ad.status = adObj.status
        this.ad.category = new AdCategory()
        this.ad.category.id = adObj.categoryId

        if (adObj.attributes) {
            adObj.attributes.forEach(attr => {
                if (!attr.isSystemGenerated() && attr.value) {
                    const attrObj = new AdAttribute
                    attrObj.id = attr.id
                    attrObj.setValue(attr.value)
                    this.ad.attributes.push(attrObj)
                }
            })
        }
    }
}