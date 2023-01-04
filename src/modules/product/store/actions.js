import {actionTypes} from '@/core/constants'
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
        if (item.id) {
            const {data} = await Http.put(`api/product/${item.id}`, item)
            return data
        } else {
            const {data} = await Http.post('api/product', item)
            return data
        }
    },

    async [actionTypes.PRODUCT.REMOVE](context, id) {
        await Http.delete(`api/product/${id}`)
    },

}
