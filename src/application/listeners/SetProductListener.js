import store from '@/core/store'
import { mutationTypes } from '@/core/constants'
import packageJson from '../../../package'

class SetProductListener {
    async execute() {
        return store.commit(mutationTypes.COMMON.SET_PRODUCT, {packageJson})
    }
}

export default new SetProductListener()
