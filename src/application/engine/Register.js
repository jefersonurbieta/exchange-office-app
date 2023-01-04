import Vue from 'vue'
import '@/plugins'
import '@/views/components'
import mixins from '@/views/mixins'
import filters from '@/views/filters'

class Register {

    registerAll() {
        Vue.use(mixins)
        Vue.use(filters)
    }

}

export default new Register()
