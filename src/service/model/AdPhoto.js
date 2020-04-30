export default class AdPhoto {
    adId
    viewId
    title
    fileName
    key
    displayOrder

    url

    newTitle = null

    constructor (jsonObj) {
        if (jsonObj) {
            this.adId = jsonObj.adId
            this.viewId = jsonObj.viewId
            this.title = jsonObj.title
            this.fileName = jsonObj.fileName
            this.key = jsonObj.key
            this.displayOrder = jsonObj.displayOrder

            if (this.key) {
                let parts = this.key.split(':')
                this.url = 'https://' + parts[0] + '.s3.amazonaws.com/' + parts[1]
            } else if (this.fileName) {
                this.url = 'http://findmyroof.com/var/post/' + this.adId + '/' + this.fileName
            }
        }
    }
}