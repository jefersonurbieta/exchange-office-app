import blankText from './blank-text'
import real from './real'
import realWithCustomDecimalPlaces from './realWithCustomDecimalPlaces'
import value from './value'
import valueWithCustomDecimalPlaces from './valueWithCustomDecimalPlaces'
import status from './status'
import date from './date'
import datetime from './datetime'

export default {
    install(Vue) {
        Vue.filter('blankText', blankText)
        Vue.filter('real', real)
        Vue.filter('realWithCustomDecimalPlaces', realWithCustomDecimalPlaces)
        Vue.filter('value', value)
        Vue.filter('valueWithCustomDecimalPlaces', valueWithCustomDecimalPlaces)
        Vue.filter('date', date)
        Vue.filter('datetime', datetime)
        Vue.filter('status', status)
    }
}
