import AdServiceRequest from "../service/AdServiceRequest"
import AdService from '../service/AdServiceRequest'
import EventManager from '../util/EventManager'
import AppEvent from '../util/AppEvent'

export default {
    methods: {
        save(ad) {
            let serviceRequest = AdServiceRequest.fullUpdate(ad)
            AdService.update(serviceRequest).then((updatedAd) => {
                let message = 'The ad #' + updatedAd.id + ' has been updated.' 
                EventManager.publishAppEvent(AppEvent.ofSuccess(AppEvent.AD_UPDATE, message))
            })
            .catch((error) => {
              console.error(error)
              let message = 'There is an error updating the ad.' 
              EventManager.publishAppEvent(AppEvent.ofFailure(AppEvent.AD_UPDATE, message))
            })
        },
        activate(ad) {
            let serviceRequest = AdServiceRequest.activate(ad)
            AdService.update(serviceRequest).then((updatedAd) => {
                let message = 'The ad #' + updatedAd.id + ' has been activated.' 
                EventManager.publishAppEvent(AppEvent.ofSuccess(AppEvent.AD_ACTIVATION, message))
            })
            .catch((error) => {
              console.error(error)
              let message = 'There is an error activating the ad.' 
              EventManager.publishAppEvent(AppEvent.ofFailure(AppEvent.AD_ACTIVATION, message))
            })
        },
        deActivate(ad) {
            let serviceRequest = AdServiceRequest.deActivate(ad)
            AdService.update(serviceRequest).then((updatedAd) => {
                let message = 'The ad #' + updatedAd.id + ' has been de-activated.' 
                EventManager.publishAppEvent(AppEvent.ofSuccess(AppEvent.AD_DEACTIVATION, message))
            })
            .catch((error) => {
              console.error(error)
              let message = 'There is an error de-activating the ad.' 
              EventManager.publishAppEvent(AppEvent.ofFailure(AppEvent.AD_DEACTIVATION, message))
            })
        },
        extend(ad) {
            let serviceRequest = AdServiceRequest.extention(ad)
            AdService.update(serviceRequest).then((updatedAd) => {
                let message = 'The ad #' + updatedAd.id + ' has been extended.' 
                EventManager.publishAppEvent(AppEvent.ofSuccess(AppEvent.AD_EXTENSION, message))
            })
            .catch((error) => {
              console.error(error)
              let message = 'There is an error extending the ad.' 
              EventManager.publishAppEvent(AppEvent.ofFailure(AppEvent.AD_EXTENSION, message))
            })
        },
        remove(ad) {
            let serviceRequest = AdServiceRequest.remove(ad)
            AdService.update(serviceRequest).then((updatedAd) => {
                let message = 'The ad #' + updatedAd.id + ' has been removed.' 
                EventManager.publishAppEvent(AppEvent.ofSuccess(AppEvent.AD_REMOVAL, message))
            })
            .catch((error) => {
              console.error(error)
              let message = 'There is an error removing the ad.' 
              EventManager.publishAppEvent(AppEvent.ofFailure(AppEvent.AD_REMOVAL, message))
            })
        }
    }
}