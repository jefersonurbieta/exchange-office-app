import { actionTypes } from '@/core/constants'
import Http from '@/core/utils/Http'
import moment from "moment/moment";

export default {

    async [actionTypes.PROFIT.FIND_ALL_COMPLETE](context, query) {
        query.startDate = moment(query.startDate).format('yyyy-MM-DD')
        query.endDate = moment(query.endDate).format('yyyy-MM-DD')
        const {data} = await Http.post('api/movement/profit/advanced-search', query)
        return data
    },
}
