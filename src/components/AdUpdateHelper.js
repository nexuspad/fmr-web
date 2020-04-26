import AdServiceRequest from "../service/AdServiceRequest"
import AdService from '../service/AdService'
import EventManager from '../util/EventManager'
import AppEvent from '../util/AppEvent'
import ApiError from "../service/ApiError"

export default {
    methods: {
        _handleError(error) {
            console.error(error)
            if (error instanceof ApiError) {
              EventManager.publishApiEvent(AppEvent.ofApiFailure(error));
            } else {
              let message = 'There is an error updating the ad.' 
              EventManager.publishAppEvent(AppEvent.ofFailure(AppEvent.AD_UPDATE_FAILURE, message))  
            }
        },
        editAd() {
            let pathToEdit = '/ad/edit?id=' + this.ad.id
            this.$router.push({path: pathToEdit});
        },
        save() {
            let serviceRequest = AdServiceRequest.fullUpdate(this.ad)
            const self = this
            AdService.update(serviceRequest).then((updatedAd) => {
                self.ad.copy(updatedAd)
                let message = 'The ad #' + updatedAd.id + ' has been updated.' 
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
              let message = 'There is an error activating the ad.' 
              EventManager.publishAppEvent(AppEvent.ofFailure(AppEvent.AD_ACTIVATION_FAILURE, message))
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
              let message = 'There is an error de-activating the ad.' 
              EventManager.publishAppEvent(AppEvent.ofFailure(AppEvent.AD_DEACTIVATION_FAILURE, message))
            })
        },
        extend() {
            let serviceRequest = AdServiceRequest.extention(this.ad)
            const self = this
            AdService.update(serviceRequest).then((updatedAd) => {
                self.ad.copy(updatedAd)
                let message = 'The ad #' + updatedAd.id + ' has been extended.' 
                EventManager.publishAppEvent(AppEvent.ofSuccess(AppEvent.AD_EXTENSION_SUCCESS, message))
            })
            .catch((error) => {
              console.error(error)
              let message = 'There is an error extending the ad.' 
              EventManager.publishAppEvent(AppEvent.ofFailure(AppEvent.AD_EXTENSION_FAILURE, message))
            })
        },
        remove() {
            let serviceRequest = AdServiceRequest.remove(this.ad)
            const self = this
            AdService.update(serviceRequest).then((updatedAd) => {
                self.ad.copy(updatedAd)
                let message = 'The ad #' + updatedAd.id + ' has been removed.' 
                EventManager.publishAppEvent(AppEvent.ofSuccess(AppEvent.AD_REMOVAL_SUCCESS, message))
            })
            .catch((error) => {
              console.error(error)
              let message = 'There is an error removing the ad.' 
              EventManager.publishAppEvent(AppEvent.ofFailure(AppEvent.AD_REMOVAL_FAILURE, message))
            })
        }
    }
}