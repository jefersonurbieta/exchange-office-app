import { mapMutations } from 'vuex'
import { mutationTypes } from '@/core/constants'
import store from '@/core/store'

export default {
    methods: {
        disableLoading() {
            store.commit(mutationTypes.LOKI.SET_GLOBAL_LOADING, false)
        },
        enableLoading() {
            store.commit(mutationTypes.LOKI.SET_GLOBAL_LOADING, true)
        },
        setLoadingMessage(message) {
            this.setLoadingMessage(message)
        },
        ...mapMutations([
            mutationTypes.LOKI.DISABLE_GLOBAL_LOADING,
            mutationTypes.LOKI.ENABLE_GLOBAL_LOADING,
            mutationTypes.LOKI.SET_LOADING_MESSAGE])
    }
}
