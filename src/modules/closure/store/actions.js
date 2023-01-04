import {actionTypes} from '@/core/constants'
import Http from '@/core/utils/Http'

export default {

    async [actionTypes.CLOSURE.FIND_BY_ID](context, id) {
        const {data} = await Http.get(`api/closure/${id}`)
        return data
    },

    async [actionTypes.CLOSURE.FIND_MOVEMENTS_BY_ID](context, id) {
        const {data} = await Http.get(`api/closure/${id}/movements`)
        return data
    },

    async [actionTypes.CLOSURE.SAVE]() {
        const {data} = await Http.post('api/closure')
        return data
    },

    async [actionTypes.CLOSURE.ADVANCED_SEARCH](context, {filter, pagination}) {
        const filterToSend = {}
        for (let [key] of Object.entries(filter)) {
            if (filter[key] && filter[key].value) {
                filterToSend[key] = filter[key].value
            }
        }

        filterToSend.page = pagination.page - 1
        filterToSend.size = pagination.itemsPerPage
        filterToSend.sortBy = pagination.sortBy[0]
        filterToSend.sortDesc = pagination.sortDesc[0]

        const {data} = await Http.post('api/closure/advanced-search', filterToSend)
        return data
    },
}
