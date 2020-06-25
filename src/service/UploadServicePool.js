import UploadService from './UploadService'
import FileWrapper from './model/FileWrapper'

export default class UploadServicePool {
    static serviceReferences = []
    static maxConcurrentUpload = 2
    static timeInterval = 5
    static timerId = 0

    static getServiceFromPool () {
        console.debug('upload service pool size: ', UploadServicePool.serviceReferences.length);
        if (UploadServicePool.serviceReferences.length < UploadServicePool.maxConcurrentUpload) {
          let uploadService = new UploadService();
          UploadServicePool.serviceReferences.push(uploadService);
          return uploadService;
        } else {
          let i = UploadServicePool.serviceReferences.length;
          while (i--) {
            if (UploadServicePool.serviceReferences[i].isDone()) {
              console.debug('free service instance from the pool');
              UploadServicePool.serviceReferences.splice(i, 1);
            }
          }
          if (UploadServicePool.serviceReferences.length < UploadServicePool.maxConcurrentUpload) {
            let uploadService = new UploadService();
            UploadServicePool.serviceReferences.push(uploadService);
            return uploadService;
          }
        }
        return null;
    }
  
    static cancelUpload(fileObj) {
        UploadServicePool.serviceReferences.forEach(uploadService => {
            if (uploadService.uploadId === fileObj.uploadId) {
                uploadService.cancelUpload();
                fileObj.uploadProgress = 0;
                fileObj.status = FileWrapper.CANCELLED;
            }
        })
    }
}