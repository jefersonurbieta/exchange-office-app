import store from '@/core/store'
import { mutationTypes } from '@/core/constants'

class SetMenuAvatarListener {
    async execute() {
        return new Promise((resolve) => {
            store.commit(mutationTypes.COMMON.SET_AVATAR_ACTIONS)
            resolve()
        })
    }
}

export default new SetMenuAvatarListener()
