import {actionTypes} from '@/core/constants'
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
        if (item.id) {
            const {data} = await Http.put(`api/company/${item.id}`, item)
            return data
        } else {
            const {data} = await Http.post('api/company', item)
            return data
        }
    },

}
