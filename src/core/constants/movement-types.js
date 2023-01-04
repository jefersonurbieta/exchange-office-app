const value = {
    PURCHASE_SALE: {
        name: 'Compra/Venda',
        value: 'PURCHASE_SALE'
    },
    TRANSFER: {
        name: 'Transferência',
        value: 'TRANSFER'
    },
    INPUT: {
        name: 'Entrada',
        value: 'INPUT'
    },
    OUTPUT: {
        name: 'Saida',
        value: 'OUTPUT'
    },
    CLOSURE: {
        name: 'Fechamento',
        value: 'CLOSURE'
    }
}

export default {
    PURCHASE_SALE: value.PURCHASE_SALE.value,
    TRANSFER: value.TRANSFER.value,
    INPUT: value.INPUT.value,
    OUTPUT: value.OUTPUT.value,
    CLOSURE: value.CLOSURE.value,
    list: [value.PURCHASE_SALE, value.TRANSFER, value.INPUT, value.OUTPUT, value.CLOSURE],
    getName(property) {
        const found = value[property]
        return found ? found.name : ''
    }
}
