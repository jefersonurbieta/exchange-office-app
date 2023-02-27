import Vue from 'vue'
import {mutationTypes} from '@/core/constants'
import AuthoritiesUtils from '@/core/utils/AuthoritiesUtils'

export default {

    [mutationTypes.COMMON.SET_EXPAND_MENU](state) {
        Vue.set(state.loki, 'asideClosed', false)
    },

    [mutationTypes.COMMON.SET_AVATAR_ACTIONS](state) {
        const actions = {
            1: {title: 'Perfil', icon: 'fa-light fa-user', path: '/profile'}
        }
        if (AuthoritiesUtils.userHasManagerRole(state.loggedUser)) {
            actions[2] = {title: 'Empresa', icon: 'fa-light fa-building', path: '/current-company'}
        }
        Vue.set(state.loki, 'avatarActions', actions)
    },

    [mutationTypes.COMMON.SET_PRODUCT](state, {packageJson}) {
        state.loki.product.id = 1
        state.loki.product.name = packageJson.name
        state.loki.product.mainLogo = '/static/img/logo-colorido.png'
        state.loki.product.symbolLogo = '/static/img/logo-reduzida.png'
        state.loki.product.logoMobile = '/static/img/logo-colorido.png'
        state.loki.product.version = packageJson.version
        state.loki.product.logoutUrl = '/#/logout'
        state.loki.product.copywrite = 'Todos os direitos reservados'
    },

    [mutationTypes.COMMON.SET_RETRACT_MENU](state) {
        Vue.set(state.loki, 'asideClosed', true)
    },

    [mutationTypes.COMMON.SET_LOGGED_USER](state, user) {
        const userToSend = {
            userId: user.id,
            userName: user.name.split(' ')[0],
            id: user.id,
            name: user.name.split(' ')[0],
            fullName: user.name,
            photo: '',
            imageUrl: '',
            role: user.role,
            type: user.role,
            domainType: '',
            domainId: '',
            authorities: AuthoritiesUtils.authoritiesByRole(user.role)
        }
        Vue.set(state.loki, 'user', userToSend)
        state.loggedUser = user
    },

    [mutationTypes.COMMON.SET_COMPANY](state, value) {
        state.loggedCompany = value
        document.title = value.name
    },

    [mutationTypes.COMMON.SET_COMPANIES](state, value) {
        state.userCompanies = value
    },

    [mutationTypes.COMMON.SET_AUTH_TOKEN](state, value) {
        state.authToken = value
        localStorage.setItem('vue-token', value)
    },

    [mutationTypes.COMMON.SET_AUTH_REFRESH_TOKEN](state, value) {
        state.authRefreshToken = value
        localStorage.setItem('vue-refresh-token', value)
    },

}
