import NumberUtils from '@/core/utils/NumberUtils'

export default (value) => {
    if (!value) return ''
    const parts = value.toString()?.split('.');
    const numberOfDecimalPlaces = parts?.[1]?.length ?? 2;
    return 'R$ ' + NumberUtils.formatValue(value, numberOfDecimalPlaces)
}
