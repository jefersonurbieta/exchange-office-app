import store from '@/core/store'
import {actionTypes} from '@/core/constants'

class SearchCompanyListener {
    async execute() {
        return store.dispatch(actionTypes.COMMON.SEARCH_COMPANY)
    }
}

export default new SearchCompanyListener()
