const value = {
    ACTIVATED: {
        name: 'Ativo',
        value: 'ACTIVATED'
    },
    DISABLED: {
        name: 'Inativo',
        value: 'DISABLED'
    },
    CREATED: {
        name: 'Criada',
        value: 'CREATED'
    },
    RESERVED: {
        name: 'Reservada',
        value: 'RESERVED'
    },
    FINISHED: {
        name: 'Finalizada',
        value: 'FINISHED'
    },
    CANCELED: {
        name: 'Cancelada',
        value: 'CANCELED'
    }
}

export default {
    ACTIVATED: value.ACTIVATED.value,
    DISABLED: value.DISABLED.value,
    CREATED: value.CREATED.value,
    RESERVED: value.RESERVED.value,
    FINISHED: value.FINISHED.value,
    CANCELED: value.CANCELED.value,
    list: [value.ACTIVATED, value.DISABLED],
    getName(property) {
        const found = value[property]
        return found ? found.name : ''
    }
}
