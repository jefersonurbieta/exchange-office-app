import NumberUtils from '@/core/utils/NumberUtils'

export default (value, numberOfDecimalPlaces) => {
    if (!value) return ''
    return NumberUtils.formatValue(value, numberOfDecimalPlaces)
}
