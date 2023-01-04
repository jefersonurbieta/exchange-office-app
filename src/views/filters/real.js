import NumberUtils from '@/core/utils/NumberUtils'

export default (value, numberOfDecimalPlaces = 2) => {
    if (!value) return ''
    return 'R$ ' + NumberUtils.formatValue(value, numberOfDecimalPlaces)
}
