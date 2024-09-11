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
    MANAGER_VIEW: {
        name: 'Gerente consulta',
        value: 'MANAGER_VIEW'
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
    MANAGER_VIEW: value.MANAGER_VIEW.value,
    COMPANY: value.COMPANY.value,
    list: [value.OPERATOR, value.MANAGER, value.MANAGER_VIEW, value.OWNER],
    adminList: [value.OPERATOR, value.MANAGER, value.MANAGER_VIEW, value.OWNER, value.ADMIN, value.COMPANY],
    getName(property) {
        const found = value[property]
        return found ? found.name : ''
    }
}
