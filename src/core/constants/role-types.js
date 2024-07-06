const value = {
    OPERATOR: {
        name: 'Operador',
        value: 'OPERATOR'
    },
    MANAGER: {
        name: 'Gerente',
        value: 'MANAGER'
    },
    OWNER: {
        name: 'Dono',
        value: 'OWNER'
    },
    ADMIN: {
        name: 'Admin',
        value: 'ADMIN'
    },
    COMPANY: {
        name: 'Empresa',
        value: 'COMPANY'
    }
}

export default {
    OPERATOR: value.OPERATOR.value,
    MANAGER: value.MANAGER.value,
    OWNER: value.OWNER.value,
    ADMIN: value.ADMIN.value,
    COMPANY: value.COMPANY.value,
    list: [value.OPERATOR, value.MANAGER, value.OWNER],
    adminList: [value.OPERATOR, value.MANAGER, value.OWNER, value.ADMIN, value.COMPANY],
    getName(property) {
        const found = value[property]
        return found ? found.name : ''
    }
}
