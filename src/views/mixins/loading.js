import { mapMutations } from 'vuex'
import { mutationTypes } from '@/core/constants'

export default {
    methods: {
        disableGlobalLoading() {
            this.disableGlobalLoading()
        },
        enableGlobalLoading() {
            this.enableGlobalLoading()
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
