import RestClient from './RestClient';
import AccountService from './AccountService'
import FmrAd from './model/FmrAd'
import ApiError from './ApiError'
import AdServiceRequest from './AdServiceRequest';

export default class UploadService {
    uploadId = '';
    // for cancellation
    _axiosSource = null;
    _cancelled = false;
    _active = true;

    uploadFile(id, file, progressCallback) {
        const cloudConfigUrl = '/upload/accessKey';

        // TODO
        const fileName = file.name

        const self = this
        return new Promise((resolve, reject) => {
            AccountService.getToken().then((token) => {
                const request = AdServiceRequest.cloudUploadAccess(id, fileName)

                // ============ I. create place holder for the upload ============
                RestClient.instance(token).post(cloudConfigUrl, request)
                    .then(function (response) {
                        // Parse application level response data
                        console.log(response)
                        if (response.data.code !== 'SUCCESS') {
                            self._concludeService({ resolve: resolve, reject: reject, error: new ApiError(response.data.code) });
                        } else {
                            progressCallback({ uploadId: fileName });
    
                            // ============ II. upload the file to the cloud ============
                            const cloudConfig = response.data.cloudConfig
                            self._uploadToCloud(cloudConfig, file, progressCallback)
                                .then(function () {
                                    // ============ III. call API to update database ============
                                    self._completeUpload(token, id, cloudConfig.file_name, cloudConfig.s3_key)
                                        .then(function (response) {
                                            // ============ FINAL resolve into Uploader.vue ============
                                            if (response.data.code == 'SUCCESS') {
                                                self._concludeService({ resolve: resolve, ad: new FmrAd(response.data.ad) });
                                            } else {
                                                self._concludeService({ reject: reject, error: new ApiError(response.data.code) });
                                            }
                                        })
                                        .catch(function (error) {
                                            self._concludeService({ reject: reject, error: error });
                                        });
                                })
                                .catch(function (error) {
                                    console.log(error)
                                })
                        }
                    })
                    .catch(function (error) {
                        self._concludeService({ reject: reject, error: error });
                    });
    
            })
            .catch((error) => {
                console.error('Account service', error)
                reject(error)
            })
        });
    }

    cancelUpload() {
        this._cancelled = true;
        if (this._axiosSource !== null) {
            console.log('cancel the upload');
            this._axiosSource.cancel('upload cancelled by user');
        }
    }

    isDone() {
        return !this._active;
    }

    _uploadToCloud(cloudConfig, file, progressCallback) {
        let axiosClient = RestClient.instanceForUploading();

        const CancelToken = axiosClient.CancelToken;
        this._axiosSource = CancelToken.source();

        let option = {
            headers: { 'content-type': 'multipart/form-data' },
            onUploadProgress: function (progressEvent) {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (progressCallback) {
                    // loaded and total are for CKEditorUploadAdapter
                    progressCallback({ completed: percentCompleted, loaded: progressEvent.loaded, total: progressEvent.total });
                }
            },
            cancelToken: this._axiosSource.token
        };

        let formData = new FormData();

        // key attribute must go in first
        formData.append('key', cloudConfig.s3_key);
        formData.append('AWSAccessKeyId', cloudConfig.aws_access_key);
        formData.append('acl', 'private');
        formData.append('policy', cloudConfig.s3_policy);
        formData.append('signature', cloudConfig.s3_signature);
        formData.append('Content-Type', cloudConfig.file_type);
        formData.append('filename', cloudConfig.file_name);
        formData.append('file', file);

        console.log('submit form data for uploading', formData);

        return axiosClient.post(cloudConfig.s3_url, formData, option);
    }

    // call API to update the database
    _completeUpload(token, id, fileName, key) {
        const request = AdServiceRequest.addPhoto(id, fileName, key)
        return RestClient.instance(token).post('/upload/addPhoto', request)
    }

    // resolve into the Uploader.vue
    _concludeService({ resolve, reject, ad, error = null }) {
        this._active = false
        if (resolve) {
            resolve(ad)
        } else {
            reject(error)
        }
    }

    mockUploadFile(folder, entryId, file, progressCallback) {
        let self = this;
        return new Promise((resolve) => {
            progressCallback({ completed: 50 });
            let randomSeconds = 6 + Math.floor(Math.random() * 10);
            setTimeout(() => {
                progressCallback({ completed: 100 });
                self._concludeService({ resolve: resolve })
            }, randomSeconds * 1000);
        });
    }
}
