import {DateUtils} from '@/core/utils'

export default (value) => {
    if (!value) return ''
    return DateUtils.formatDateTime(value)
}
