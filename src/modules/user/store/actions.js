import { actionTypes } from '@/core/constants'
import Http from '@/core/utils/Http'

export default {

    async [actionTypes.USER.FIND_ALL]() {
        const {data} = await Http.get('api/user')
        return data
    },

    async [actionTypes.USER.FIND_ALL_TO_BALANCE]() {
        const {data} = await Http.get('api/user/balance')
        return data
    },

    async [actionTypes.USER.FIND_BY_ID](context, id) {
        const {data} = await Http.get(`api/user/${id}`)
        return data
    },

    async [actionTypes.USER.SAVE](context, item) {
        if (item.id) {
            const {data} = await Http.put(`api/user/${item.id}`, item)
            return data
        } else {
            const {data} = await Http.post('api/user', item)
            return data
        }
    },

}
