const value = {
    OPERATOR: {
        name: 'Operador',
        value: 'OPERATOR'
    },
    MANAGER: {
        name: 'Gerente',
        value: 'MANAGER'
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
    ADMIN: value.ADMIN.value,
    COMPANY: value.COMPANY.value,
    list: [value.OPERATOR, value.MANAGER],
    adminList: [value.OPERATOR, value.MANAGER, value.ADMIN, value.COMPANY],
    getName(property) {
        const found = value[property]
        return found ? found.name : ''
    }
}
