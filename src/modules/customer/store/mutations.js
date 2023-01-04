import Vue from 'vue'
import { mutationTypes } from '@/core/constants'

export default {
    [mutationTypes.CUSTOMER.SET_FILTER](state, value) {
        Vue.set(state, 'filter', value)
    },
    [mutationTypes.CUSTOMER.SET_PAGINATION](state, value) {
        Vue.set(state, 'pagination', value)
    },
}
