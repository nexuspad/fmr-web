export default class AdPhoto {
    adId
    title
    fileName
    key
    displayOrder

    constructor (jsonObj) {
        if (jsonObj) {
            this.adId = jsonObj.adId
            this.title = jsonObj.title
            this.fileName = jsonObj.fileName
            this.key = jsonObj.key
            this.displayOrder = jsonObj.displayOrder
        }
    }
}