import blankText from './blank-text'
import real from './real'
import value from './value'
import status from './status'
import date from './date'
import datetime from './datetime'

export default {
    install(Vue) {
        Vue.filter('blankText', blankText)
        Vue.filter('real', real)
        Vue.filter('value', value)
        Vue.filter('date', date)
        Vue.filter('datetime', datetime)
        Vue.filter('status', status)
    }
}
