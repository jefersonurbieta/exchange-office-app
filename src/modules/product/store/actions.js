import {actionTypes, mutationTypes} from '@/core/constants'
import Http from '@/core/utils/Http'
import moment from 'moment'

export default {

    async [actionTypes.PRODUCT.FIND_ALL]() {
        const {data} = await Http.get('api/product')
        return data
    },

    async [actionTypes.PRODUCT.FIND_ALL_COMPLETE](context, query) {
        if (query.date) {
            query.date = moment(query.date).format('DD-MM-yyyy')
        }
        const {data} = await Http.post('api/product/complete', query)
        return data
    },

    async [actionTypes.PRODUCT.FIND_ALL_COMPANY]() {
        const {data} = await Http.get('api/product/company')
        return data
    },

    async [actionTypes.PRODUCT.FIND_BY_ID](context, id) {
        const {data} = await Http.get(`api/product/${id}`)
        return data
    },

    async [actionTypes.PRODUCT.SAVE](context, item) {
        context.commit(mutationTypes.LOKI.SET_GLOBAL_LOADING, true)
        if (item.id) {
            const {data} = await Http.put(`api/product/${item.id}`, item)
            context.commit(mutationTypes.LOKI.SET_GLOBAL_LOADING, false)
            return data
        } else {
            const {data} = await Http.post('api/product', item)
            context.commit(mutationTypes.LOKI.SET_GLOBAL_LOADING, false)
            return data
        }
    },

    async [actionTypes.PRODUCT.REMOVE](context, id) {
        await Http.delete(`api/product/${id}`)
    },

    async [actionTypes.PRODUCT.FIND_ALL_CATEGORIES]() {
        const {data} = await Http.get('api/product/categories')
        return data
    },

}
