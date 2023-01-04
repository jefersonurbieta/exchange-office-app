import store from '@/core/store'
import { actionTypes } from '@/core/constants'

class SearchLoggedUserListener {
    async execute() {
        return store.dispatch(actionTypes.COMMON.SEARCH_LOGGED_USER)
    }
}

export default new SearchLoggedUserListener()
