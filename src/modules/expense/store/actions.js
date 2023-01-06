import {actionTypes} from '@/core/constants'
import Http from '@/core/utils/Http'
import moment from 'moment'

export default {

    async [actionTypes.EXPENSE.FIND_ALL]() {
        const {data} = await Http.get('api/expense')
        return data
    },

    async [actionTypes.EXPENSE.FIND_ALL_COMPLETE](context, query) {
        if(query.date) {
            query.date = moment(query.date).format('DD-MM-yyyy')
        }
        const {data} = await Http.post('api/expense/complete', query)
        return data
    },

    async [actionTypes.EXPENSE.FIND_BY_ID](context, id) {
        const {data} = await Http.get(`api/expense/${id}`)
        return data
    },

    async [actionTypes.EXPENSE.SAVE](context, item) {
        if(item.date) {
            item.date = moment(item.date).format('DD-MM-yyyy')
        }
        if (item.id) {
            const {data} = await Http.put(`api/expense/${item.id}`, item)
            return data
        } else {
            const {data} = await Http.post('api/expense', item)
            return data
        }
    },

    async [actionTypes.EXPENSE.REMOVE](context, id) {
        await Http.delete(`api/expense/${id}`)
    },

}
