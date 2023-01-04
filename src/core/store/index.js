import Vuex from 'vuex'
import {actions, mutations, state} from './common'

import modules from '@/modules'

const modulesStore = {}

for (const module in modules) {
    if (modules[module].store) {
        modulesStore[module] = modules[module].store
    }
}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    modules: modulesStore
})

export default store
