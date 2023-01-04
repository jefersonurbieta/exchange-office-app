import Vue from 'vue'
import { mutationTypes } from '@/core/constants'

export default {
    [mutationTypes.MOVEMENT.SET_FILTER](state, value) {
        Vue.set(state, 'filter', value)
    },
    [mutationTypes.MOVEMENT.SET_PAGINATION](state, value) {
        Vue.set(state, 'pagination', value)
    },
    [mutationTypes.MOVEMENT.SET_RESERVATION_PAGINATION](state, value) {
        Vue.set(state, 'reservationPagination', value)
    },
}
