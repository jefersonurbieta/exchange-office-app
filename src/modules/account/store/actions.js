import {actionTypes} from '@/core/constants'
import Http from '@/core/utils/Http'
import moment from 'moment'

export default {

    async [actionTypes.ACCOUNT.FIND_ALL]() {
        const {data} = await Http.get('api/account')
        return data
    },

    async [actionTypes.ACCOUNT.FIND_ALL_COMPLETE](context, query) {
        if (!query) {
            query = {}
        }
        if (query.date) {
            query.date = moment(query.date).format('DD-MM-yyyy')
        }
        const {data} = await Http.post('api/account/complete', query)
        return data
    },

    async [actionTypes.ACCOUNT.FIND_BY_ID](context, id) {
        const {data} = await Http.get(`api/account/${id}`)
        return data
    },

    async [actionTypes.ACCOUNT.SAVE](context, item) {
        if (item.id) {
            const {data} = await Http.put(`api/account/${item.id}`, item)
            return data
        } else {
            const {data} = await Http.post('api/account', item)
            return data
        }
    },

    async [actionTypes.ACCOUNT.REMOVE](context, id) {
        await Http.delete(`api/account/${id}`)
    },

}
