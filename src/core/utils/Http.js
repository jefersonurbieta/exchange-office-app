import ApiErrorValidations from '@/core/exceptions/ApiErrorValidations'
import exceptionHandler from '@/core/exceptions/ExceptionHandler'
import axios from 'axios'

export default class Http {
    static create() {
        const instance = axios.create()
        this.registerInterceptors(instance)
        this.setHeaderDefaultsValues(instance)
        return instance
    }

    static registerInterceptors(instance) {
        instance.interceptors.request.use(this.handleRequest, this.handleErrors)
        instance.interceptors.response.use(this.handleResponse, this.handleErrors)
    }

    static setHeaderDefaultsValues(instance) {
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('vue-token')
    }

    static handleRequest(config) {
        return config
    }

    static handleResponse(response) {
        return response
    }

    static handleErrors(error) {
        console.log(error.response)
        if (error.response.data) {
            throw new ApiErrorValidations(error.response.data.message, error.response)
        } else {
            exceptionHandler.handleUnauthorized()
        }
    }

    static post(url, data, config) {
        return this.create().post(url, data, config)
    }

    static put(url, data, config) {
        return this.create().put(url, data, config)
    }

    static get(url, config) {
        return this.create().get(url, config)
    }

    static delete(url, config) {
        return this.create().delete(url, config)
    }
}
