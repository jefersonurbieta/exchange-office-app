const value = {
    PURCHASE: {
        name: 'Compra',
        value: 'PURCHASE'
    },
    SALE: {
        name: 'Venda',
        value: 'SALE'
    }
}

export default {
    PURCHASE: value.PURCHASE.value,
    SALE: value.SALE.value,
    list: [value.PURCHASE, value.SALE],
    getName(property) {
        const found = value[property]
        return found ? found.name : ''
    }
}
