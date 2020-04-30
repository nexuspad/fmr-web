import axios from 'axios'
import EventManager from '../util/EventManager';
import AppEvent from '../util/AppEvent';
import ApiError from './ApiError';
import StorageUtils from '../util/StorageUtil'

export default class RestClient {
    static _axiosInstance = null;
    static apiUrl = 'http://localhost:8080/';

    static get(fullUrl) {
        return axios.get(fullUrl);
    }

    static instance(token, optional = { timeout: 3000 }) {
        if (!this.apiUrl) {
            throw new ApiError(AppEvent.ABORT);
        }

        if (!token) token = '';

        if (this._axiosInstance !== null && this._axiosInstance.defaults.headers['Authorization'] !== token) {
            console.log('[RestClient] reset...because the Authorization token has changed');
            this._axiosInstance = null;
        }

        if (this._axiosInstance === null) {
            let headers
            if (token)
                headers = { 'Authorization': token };

            this._axiosInstance = axios.create({
                baseURL: this.apiUrl,
                timeout: optional.timeout,
                headers: headers
            });

            // response interceptor
            // Re-try once if there is certain error.
            this._axiosInstance.interceptors.response.use(
                (data) => {
                    EventManager.publish(AppEvent.LOADING, false);
                    return data;
                },
                (error) => {
                    if (error.code === 'ECONNABORTED') {
                        console.log('Retry request...', error.config.url);
                        return axios.request(error.config);
                    }

                    EventManager.publish(AppEvent.LOADING, false);

                    // application error response is available
                    if (error.response) {
                        // status code like 403
                        if (error.response.status === 403) {
                            // a little clean up here
                            StorageUtils.deleteFromSession('token')
                            return Promise.reject(ApiError.authenticationError())
                        } else if (error.response.status === 500) {
                            return Promise.reject(ApiError.internalError())
                        } else {
                            if (error.response.data && error.response.data.code) {
                                return Promise.reject(new ApiError(error.response.data.code));
                            } else {
                                return Promise.reject(new ApiError(error.response.status));
                            }
                        }
                    } else {
                        console.error(error)
                        return Promise.reject(ApiError.internalError())
                    }
                }
            );

            this._axiosInstance.interceptors.request.use(function (config) {
                // before request is sent
                EventManager.publish(AppEvent.LOADING, true);
                return config;
            }, function (error) {
                // request error
                EventManager.publish(AppEvent.LOADING, false);
                return Promise.reject(error);
            });

        } else {
            this._axiosInstance.defaults.headers['Authorization'] = token;
        }

        return this._axiosInstance;
    }

    static instanceForUploading() {
        const instance = axios.create();
        instance.CancelToken = axios.CancelToken;
        return instance;
    }

    static addParamToUri(uri, key, value) {
        if (!uri) {
            return '';
        }

        let uriParts = uri.split('?');

        if (uriParts.length > 1) {
            return uri + '&' + key + '=' + encodeURIComponent(value);
        } else {
            return uri + '?' + key + '=' + encodeURIComponent(value);
        }
    }

    static destroy() {
        this._axiosInstance = null;
    }
}
