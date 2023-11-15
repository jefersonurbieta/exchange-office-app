import {actionTypes, mutationTypes} from '@/core/constants'
import Http from '@/core/utils/Http'

export default {

    async [actionTypes.COMPANY.FIND_ALL]() {
        const {data} = await Http.get('api/company')
        return data
    },

    async [actionTypes.COMPANY.FIND_BY_ID](context, id) {
        const {data} = await Http.get(`api/company/${id}`)
        return data
    },

    async [actionTypes.COMPANY.SAVE](context, item) {
        context.commit(mutationTypes.LOKI.SET_GLOBAL_LOADING, true)
        if (item.id) {
            const {data} = await Http.put(`api/company/${item.id}`, item)
            context.commit(mutationTypes.LOKI.SET_GLOBAL_LOADING, false)
            return data
        } else {
            const {data} = await Http.post('api/company', item)
            context.commit(mutationTypes.LOKI.SET_GLOBAL_LOADING, false)
            return data
        }
    },

}
