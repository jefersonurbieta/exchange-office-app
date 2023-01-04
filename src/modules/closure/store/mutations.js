import Vue from 'vue'
import { mutationTypes } from '@/core/constants'

export default {
    [mutationTypes.CLOSURE.SET_FILTER](state, value) {
        Vue.set(state, 'filter', value)
    },
    [mutationTypes.CLOSURE.SET_PAGINATION](state, value) {
        Vue.set(state, 'pagination', value)
    },
}
