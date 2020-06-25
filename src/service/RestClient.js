import axios from 'axios'
import EventManager from '../util/EventManager';
import AppEvent from '../util/AppEvent';
import ApiError from './ApiError';
import StorageUtils from '../util/StorageUtil'

export default class RestClient {
    static _axiosInstance = null;
    static apiUrl = process.env.VUE_APP_API_URL;

    static get(fullUrl) {
        return axios.get(fullUrl);
    }

    static instance(token = null, optional = { timeout: 3000 }) {
        if (!this.apiUrl) {
            throw new ApiError(AppEvent.ABORT);
        }

        let tokenInHeader = null
        if (this._axiosInstance !== null) {
            tokenInHeader = this._axiosInstance.defaults.headers['Authorization']
            if (typeof tokenInHeader === 'undefined' || (tokenInHeader != null && tokenInHeader.length === 0)) {
                tokenInHeader = null
            }    
        }

        // only reset when there is an existing token in the header, and it's different from the new non-null token
        if (token === null && tokenInHeader !== null) {
            console.debug('[RestClient] reset...because the Authorization token needs to be removed: ' + tokenInHeader);
            this._axiosInstance = null;

        } else if (token !== null && tokenInHeader !== token) {
            console.debug('[RestClient] reset...because the Authorization token has changed.');
            this._axiosInstance = null;
        }

        if (token && typeof token !== 'string') {
            throw Error('token is not a string', token)
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
                        console.debug('Retry request...', error.config.url);
                        return axios.request(error.config);
                    }

                    EventManager.publish(AppEvent.LOADING, false);

                    // application error response is available
                    if (error.response) {
                        if (error.response.status === 401) {
                            // unauthorized 401
                            // a little clean up here
                            StorageUtils.delete('token')
                            return Promise.reject(ApiError.authenticationError())
                        } else if (error.response.status === 403) {
                            // forbidden
                            window.location = '/site/accessdenied'
                            return Promise.reject(ApiError.accessDenied())
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
            if (token)
                this._axiosInstance.defaults.headers['Authorization'] = token;
        }

        return this._axiosInstance;
    }

    static instanceForUploading() {
        const instance = axios.create();
        instance.CancelToken = axios.CancelToken;
        return instance;
    }

    static destroy() {
        this._axiosInstance = null;
    }
}
