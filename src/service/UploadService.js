import RestClient from './RestClient';
import { PhotoUpdateRequest } from './PhotoUpdateRequest';

export default class UploadService {
    uploadId = '';
    // for cancellation
    _axiosSource = null;
    _cancelled = false;
    _active = true;

    uploadFile(id, file, progressCallback) {
        const cloudConfigUrl = '/upload/accesskey';

        // TODO
        const fileName = file.name

        const self = this
        return new Promise((resolve, reject) => {
            const request = PhotoUpdateRequest.forAccess(id, fileName)

            // ============ I. create place holder for the upload ============
            RestClient.instance().post(cloudConfigUrl, request)
                .then(function (response) {
                    // Parse application level response data
                    console.log(response)
                    if (response.data.code !== 'SUCCESS') {
                        self._concludeService({ resolve: resolve, reject: reject, error: response.data.code });
                    } else {
                        progressCallback({ uploadId: fileName });

                        // ============ II. upload the file to the cloud ============
                        self._uploadToCloud(response.data.cloudConfig, file, progressCallback)
                            .then(function (awsResponse) {
                                console.log(awsResponse)
                                // ============ III. complete the rest ============
                                self._completeUpload()
                                    .then(function (response) {
                                        if (response.data.code !== 'SUCCESS') {
                                            self._concludeService({ resolve: resolve, reject: reject, error: response.data.code });
                                        } else {
                                            // ============ FINAL resolve ============
                                            self._concludeService({ resolve: resolve, reject: reject });
                                        }
                                    })
                                    .catch(function (error) {
                                        self._concludeService({ resolve: resolve, reject: reject, error: error });
                                    });
                            })
                            .catch(function (error) {
                                console.log(error)
                            })
                    }
                })
                .catch(function (error) {
                    self._concludeService({ resolve: resolve, reject: reject, error: error });
                });
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

    _completeUpload(id, fileName, key) {
        const request = PhotoUpdateRequest.forAddingPhoto(id, fileName, key)
        return RestClient.instance().post('/upload/updatePhoto', request)
    }

    _concludeService({ resolve, reject, error = null }) {
        this._active = false
        if (error === null) {
            resolve()
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
