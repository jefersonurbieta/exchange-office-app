import accounting from 'accounting'

export default class NumberUtils {

    static formatValue(value, numberOfDecimalPlaces = 2) {
        const valueFloat = this.roundValue(value, numberOfDecimalPlaces)
        return accounting.formatNumber(valueFloat, numberOfDecimalPlaces, '.', ',')
    }

    static roundValue(value, numberOfDecimalPlaces = 2) {
        if (!value) {
            return value
        }
        const valueFloat = Number.parseFloat(value)
        const valueStr = valueFloat.toFixed(numberOfDecimalPlaces)
        return Number.parseFloat(valueStr)
    }

}
