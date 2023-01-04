import Application from './application/Application'
import Keycloak from 'keycloak-js'
import Vue from 'vue'
import store from '@/core/store'
import {actionTypes} from '@/core/constants'

const kcOptions = {
    url: process.env.VUE_APP_AUTH_URL,
    realm: process.env.VUE_APP_AUTH_REALM,
    clientId: 'app'
}

const kcInitOptions = {
    onLoad: 'login-required',
    checkLoginIframe: false
}

const keycloak = new Keycloak(kcOptions)

keycloak
    .init(kcInitOptions)
    .then((auth) => {
        if (!auth) {
            window.location.reload()
        } else {
            Vue.$log.info('Authenticated')
        }

        store.dispatch(actionTypes.COMMON.LOGIN, keycloak)

        Vue.prototype.$keycloak = keycloak

        Application.run()

        setInterval(() => {
            keycloak.updateToken(70)
                .then((refreshed) => {
                    if (refreshed) {
                        store.dispatch(actionTypes.COMMON.LOGIN, keycloak)
                        Vue.$log.debug('Token refreshed ' + refreshed)
                    } else {
                        Vue.$log.warn('Token not refreshed, valid for '
                            + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds')
                    }
                })
                .catch(() => {
                    Vue.$log.error('Failed to refresh token')
                })


        }, 60000)

    })
    .catch(() => {
        Vue.$log.error('Authenticated Failed')
    })
