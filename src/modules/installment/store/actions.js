import {actionTypes} from '@/core/constants'
import NumberUtils from '@/core/utils/NumberUtils'

export default {

    [actionTypes.INSTALLMENT.CALC](context, {value, rate}) {
        const installments = []

        const percentageRate = rate / 100
        for (let installment = 1; installment <= 12; installment++) {
            const totalAmount = value * Math.pow((1 + percentageRate), installment);
            const installmentValue = totalAmount / installment
            const charges = totalAmount - value
            installments.push({
                installment,
                installmentValue: NumberUtils.roundValue(installmentValue, 2),
                totalAmount: NumberUtils.roundValue(totalAmount, 2),
                charges: NumberUtils.roundValue(charges, 2)
            })
        }

        return installments
    }

}
