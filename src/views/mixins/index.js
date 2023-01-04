import alert from './alert'
import constant from './constant'
import file from './file'
import loading from './loading'
import phone from './phone'
import text from './text'
import list from './list'
import user from './user'

export default {
    install(Vue) {
        Vue.mixin(alert)
        Vue.mixin(constant)
        Vue.mixin(file)
        Vue.mixin(loading)
        Vue.mixin(phone)
        Vue.mixin(text)
        Vue.mixin(list)
        Vue.mixin(user)
    }
}
