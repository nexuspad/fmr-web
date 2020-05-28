import AdServiceRequest from "../service/AdServiceRequest"
import AdService from '../service/AdService'
import EventManager from '../util/EventManager'
import AppEvent from '../util/AppEvent'
import ApiError from "../service/ApiError"
import { isRequiredAttribute } from '../service/AppData'

export default {
    methods: {
        _handleError(error, event=AppEvent.AD_UPDATE_FAILURE, message='There is an error updating the ad.') {
            console.error(error)
            if (error instanceof ApiError) {
                EventManager.publishApiEvent(AppEvent.ofApiFailure(error));
            } else {
                EventManager.publishAppEvent(AppEvent.ofFailure(event, message))  
            }
        },
        editAd() {
            let pathToEdit = '/ad/edit?id=' + this.ad.id
            this.$router.push({path: pathToEdit});
        },
        checkInvalidFields(ad) {
            if (ad !== null) {
                let invalidAttributes = []
                ad.attributes.forEach(attribute => {
                    if (isRequiredAttribute(attribute.id) && (typeof attribute.value === 'undefined' || attribute.value.length === 0)) {
                        invalidAttributes.push(attribute.name)
                    }
                })
                return invalidAttributes    
            }
            return []
        },
        save(background=true) {
            let serviceRequest = AdServiceRequest.fullUpdate(this.ad)
            const self = this
            self.posting = true
            AdService.update(serviceRequest).then((updatedAd) => {
                // copy makes typing jitters
                // self.ad.copy(updatedAd)
                self.ad.id = updatedAd.id
                self.posting = false
                console.log('saved...')

                // the server timestamp is a little different from the local, so set it to local here.
                self.ad.updateTime = Math.floor(Date.now() / 1000)

                self.checkInvalidFields(self.ad)

                if (!background) {
                    let message = 'The ad #' + updatedAd.id + ' has been updated.' 
                    EventManager.publishAppEvent(AppEvent.ofSuccess(AppEvent.AD_UPDATE_SUCCESS, message))    
                }
                let query = Object.assign({}, this.$route.query);
                if (!query.id) {
                    query.id = updatedAd.id
                    this.$router.replace({ query });
                }
            })
            .catch((error) => {
                self.posting = false
                this._handleError(error)
            })
        },
        submit() {
            let serviceRequest = AdServiceRequest.submit(this.ad)
            const self = this
            AdService.update(serviceRequest).then((updatedAd) => {
                self.ad.copy(updatedAd)
                self.$router.push('/account/myads')
                let message = 'The ad #' + updatedAd.id + ' has been submitted. In some cases new submissions will be reviewed before going live.' 
                EventManager.publishAppEvent(AppEvent.ofSuccess(AppEvent.AD_UPDATE_SUCCESS, message))
            })
            .catch((error) => {
                this._handleError(error)
            })
        },
        activate() {
            let serviceRequest = AdServiceRequest.activate(this.ad)
            const self = this
            AdService.update(serviceRequest).then((updatedAd) => {
                self.ad.copy(updatedAd)
                let message = 'The ad #' + updatedAd.id + ' has been activated.' 
                EventManager.publishAppEvent(AppEvent.ofSuccess(AppEvent.AD_ACTIVATION_SUCCESS, message))
            })
            .catch((error) => {
                console.error(error)
                this._handleError(error, AppEvent.AD_ACTIVATION_FAILURE, 'There is an error activating the ad.')
            })
        },
        deActivate() {
            let serviceRequest = AdServiceRequest.deActivate(this.ad)
            const self = this
            AdService.update(serviceRequest).then((updatedAd) => {
                self.ad.copy(updatedAd)
                let message = 'The ad #' + updatedAd.id + ' has been de-activated.' 
                EventManager.publishAppEvent(AppEvent.ofSuccess(AppEvent.AD_DEACTIVATION_SUCCESS, message))
            })
            .catch((error) => {
                console.error(error)
                this._handleError(error, AppEvent.AD_DEACTIVATION_FAILURE, 'There is an error de-activating the ad.')
            })
        },
        extend(ad) {
            let serviceRequest = AdServiceRequest.extention(ad)
            const self = this
            AdService.update(serviceRequest).then((updatedAd) => {
                self.ad.copy(updatedAd)
                let message = 'The ad #' + updatedAd.id + ' has been extended.' 
                EventManager.publishAppEvent(AppEvent.ofSuccess(AppEvent.AD_EXTENSION_SUCCESS, message))
            })
            .catch((error) => {
                console.error(error)
                this._handleError(error, AppEvent.AD_EXTENSION_FAILURE, 'There is an error extending the ad.')
            })
        },
        updatePhotoTitle(photoObj) {
            AdService.update(AdServiceRequest.updatePhotoTitle(photoObj.adId, photoObj.viewId, photoObj.title)).then((updatedAd) => {
                updatedAd.photos.forEach(photo => {
                    if (photo.viewId === photoObj.viewId) {
                        photoObj.title = photo.title
                        console.log('local title updated')
                    }
                })
            })
            .catch((error) => {
                console.error(error)
                this._handleError(error, AppEvent.AD_EXTENSION_FAILURE, 'There is an error extending the ad.')
            })
        },
        deletePhoto(photoObj) {
            const self = this
            AdService.update(AdServiceRequest.deletePhoto(this.ad.id, photoObj.viewId)).then((ad) => {
              self.ad.mergePhotos(ad)
            }).catch((error) => {
              EventManager.publishApiEvent(AppEvent.ofApiFailure(error));
            })
        },
        reorderPhotos(viewIdInOrders) {
            const self = this
            AdService.update(AdServiceRequest.reorderPhotos(this.ad.id, viewIdInOrders)).then((ad) => {
              self.ad.mergePhotos(ad)
              self.forceRefreshKey = Date.now()
            }).catch((error) => {
              console.error(error)
              EventManager.publishApiEvent(AppEvent.ofApiFailure(error));
            })
        },
        deleteAd(ad) {
            AdService.delete(ad.id).then(() => {
                let message
                if (ad.isDraft()) {
                    message = 'The draft has been deleted.' 
                } else {
                    message = 'The ad #' + ad.id + ' has been deleted.' 
                }
                EventManager.publishAppEvent(AppEvent.ofSuccess(AppEvent.AD_REMOVAL_SUCCESS, message))
            })
            .catch((error) => {
                console.error(error)
                this._handleError(error, AppEvent.AD_REMOVAL_FAILURE, 'There is an error removing the ad.')
            })
        }
    }
}