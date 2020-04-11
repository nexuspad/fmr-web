import AdPhoto from "./model/AdPhoto"

export class PhotoUpdateRequest {
    action
    photos = []

    static forAccess(id, fileName) {
        const request = new PhotoUpdateRequest()
        request.action = 'ACCESS'
        const adPhoto = new AdPhoto()
        adPhoto.adId = id
        adPhoto.fileName = fileName
        request.photos.push(adPhoto)

        return request
    }

    static forAddingPhoto(id, fileName, key) {
        const request = new PhotoUpdateRequest()
        request.action = 'ADD'
        const adPhoto = new AdPhoto()
        adPhoto.adId = id
        adPhoto.fileName = fileName
        adPhoto.key = key
        request.photos.push(adPhoto)

        return request
    }
}