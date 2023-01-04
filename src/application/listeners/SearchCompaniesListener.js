import store from '@/core/store'
import {actionTypes} from '@/core/constants'

class SearchCompanyListener {
    async execute() {
        return store.dispatch(actionTypes.COMMON.FIND_ALL_COMPANIES)
    }
}

export default new SearchCompanyListener()
