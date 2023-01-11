import {Alert, PageUtils} from '@/core/utils'
import ApiErrorValidations from '@/core/exceptions/ApiErrorValidations'
import {defaultMessages, mutationTypes} from '@/core/constants'
import Vue from "vue";

export default class ExceptionHandler {
    constructor(store, router) {
        this.store = store
        this.alert = new Alert(store)
        this.pageUtils = new PageUtils(router)
    }

    execute(error) {
        if (error instanceof ApiErrorValidations) {
            this.handleValidationError(error)
        } else {
            Vue.$log.error(error)
            this.handleError(error)
        }
        this.store.commit(mutationTypes.LOKI.DISABLE_AUTO_SAVING)
        this.store.commit(mutationTypes.LOKI.SET_GLOBAL_LOADING, false)
        this.store.commit(mutationTypes.LOKI.SET_LOADING_MESSAGE, this.store.state.defaultLoadingMessage)
    }

    handleValidationError(error) {
        if (error.multipleErrors()) {
            this.handleMultipleErrors(error.response.data.errorMessages)
        } else if (error.disconnected()) {
            this.handleDisconnected()
        } else if (error.unauthorized()) {
            this.handleUnauthorized()
        } else if (error.internalError()) {
            this.handleInternalError(error)
        } else if (error.notFound()) {
            this.handleNotFound(error)
        } else {
            this.handleUnknown()
        }
    }

    handleError(error) {
        this.alert.showError(error.message)
    }

    handleMultipleErrors(errors) {
        const errorMsg = errors.map(err => err.message).reduce((total, prox) => {
            return total + ' \n' + prox
        })
        this.alert.showError(errorMsg)
    }

    handleDisconnected() {
        this.alert.showError(defaultMessages.DISCONNECTED)
        this.pageUtils.goToHome()
    }

    handleUnauthorized() {
        this.alert.showError(defaultMessages.LOST_SESSION)
        this.pageUtils.reload()
    }

    handleNotFound(error) {
        this.handleInternalError(error)
        this.pageUtils.goToHome()
    }

    handleInternalError(error) {
        if (typeof error.response.data.message !== 'undefined') {
            const msgFormatted = error.response.data.message
            if (msgFormatted) {
                this.alert.showError(msgFormatted)
            } else {
                this.handleUnknown()
            }
        } else {
            const dataView = new DataView(error.response.data)
            const decoder = new TextDecoder('utf8')
            const response = JSON.parse(decoder.decode(dataView))
            const message = response['message']
            this.alert.showError(message)
        }
    }

    handleUnknown() {
        this.alert.showError(defaultMessages.UNKNOWN)
    }
}
