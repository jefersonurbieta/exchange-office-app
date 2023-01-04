import {actionTypes, mutationTypes} from '@/core/constants'
import Http from '@/core/utils/Http'
import {PageUtils} from '@/core/utils'

export default {

    async [actionTypes.COMMON.SEARCH_COMPANY]({commit}) {
        const {data} = await Http.get('api/company/my')
        commit(mutationTypes.COMMON.SET_COMPANY, data)
    },

    async [actionTypes.COMMON.CHANGE_COMPANY](context, companyId) {
        await Http.post(`api/user/company/${companyId}/change`)
        PageUtils.reload()
    },

    async [actionTypes.COMMON.FIND_ALL_COMPANIES]({commit}) {
        const {data} = await Http.get('api/user/companies')
        commit(mutationTypes.COMMON.SET_COMPANIES, data)
    },

    async [actionTypes.COMMON.SEARCH_LOGGED_USER]({commit}) {
        const {data} = await Http.get('api/user/me')
        commit(mutationTypes.COMMON.SET_LOGGED_USER, data)
    },

    async [actionTypes.COMMON.LOGIN]({commit}, payload) {
        commit(mutationTypes.COMMON.SET_AUTH_TOKEN, payload.token)
        commit(mutationTypes.COMMON.SET_AUTH_REFRESH_TOKEN, payload.refreshToken)
    },
}
