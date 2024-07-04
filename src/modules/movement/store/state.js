import {movementOperationTypes, movementTypes, statusTypes} from '@/core/constants'

export default {
    defaultObject: {
        type: movementTypes.PURCHASE_SALE,
        operationType: movementOperationTypes.SALE,
        status: statusTypes.FINISHED
    },
    reservationDefaultObject: {
        type: movementTypes.PURCHASE_SALE,
        operationType: movementOperationTypes.SALE,
        status: statusTypes.RESERVED
    },
    filter: {
        customerId: {
            value: null,
            default: null,
            label: 'Cliente'
        },
        customerName: {
            value: null,
            default: null,
            label: 'Cliente Nome'
        },
        type: {
            value: null,
            default: null,
            label: 'Tipo de movimentação'
        },
        types: {
            value: null,
            default: [],
            label: 'Tipo de movimentação'
        },
        status: {
            value: null,
            default: null,
            label: 'Situação de movimentação'
        },
        notStatus: {
            value: null,
            default: null,
            label: 'Situação de movimentação'
        },
        targetType: {
            value: null,
            default: null,
            label: 'Movimentação de'
        },
        operationType: {
            value: null,
            default: null,
            label: 'Operação de'
        },
        productId: {
            value: null,
            default: null,
            label: 'Produto'
        },
        accountId: {
            value: null,
            default: null,
            label: 'Conta'
        },
        userId: {
            value: null,
            default: null,
            label: 'Usuário'
        },
        startDate: {
            value: null,
            default: null,
            label: 'Data Inicio'
        },
        endDate: {
            value: null,
            default: null,
            label: 'Data Fim'
        }
    },
    defaultFilter: {
        customerId: {
            value: null,
            default: null,
            label: 'Cliente'
        },
        customerName: {
            value: null,
            default: null,
            label: 'Cliente Nome'
        },
        type: {
            value: null,
            default: null,
            label: 'Tipo de movimentação'
        },
        types: {
            value: null,
            default: [],
            label: 'Tipo de movimentação'
        },
        status: {
            value: null,
            default: null,
            label: 'Situação de movimentação'
        },
        notStatus: {
            value: null,
            default: null,
            label: 'Situação de movimentação'
        },
        targetType: {
            value: null,
            default: null,
            label: 'Movimentação de'
        },
        operationType: {
            value: null,
            default: null,
            label: 'Operação de'
        },
        productId: {
            value: null,
            default: null,
            label: 'Produto'
        },
        accountId: {
            value: null,
            default: null,
            label: 'Conta'
        },
        userId: {
            value: null,
            default: null,
            label: 'Usuário'
        },
        startDate: {
            value: null,
            default: null,
            label: 'Data Inicio'
        },
        endDate: {
            value: null,
            default: null,
            label: 'Data Fim'
        }
    },
    reservationFilter: {
        customerId: {
            value: null,
            default: null,
            label: 'Cliente'
        },
        customerName: {
            value: null,
            default: null,
            label: 'Cliente Nome'
        },
        type: {
            value: null,
            default: null,
            label: 'Tipo de movimentação'
        },
        types: {
            value: null,
            default: [],
            label: 'Tipo de movimentação'
        },
        status: {
            value: null,
            default: [],
            label: 'Situação de movimentação'
        },
        targetType: {
            value: null,
            default: null,
            label: 'Movimentação de'
        },
        operationType: {
            value: null,
            default: null,
            label: 'Operação de'
        },
        productId: {
            value: null,
            default: null,
            label: 'Produto'
        },
        accountId: {
            value: null,
            default: null,
            label: 'Conta'
        },
        userId: {
            value: null,
            default: null,
            label: 'Usuário'
        },
        startDate: {
            value: null,
            default: null,
            label: 'Data Inicio'
        },
        endDate: {
            value: null,
            default: null,
            label: 'Data Fim'
        }
    },
    reservationDefaultFilter: {
        customerId: {
            value: null,
            default: null,
            label: 'Cliente'
        },
        customerName: {
            value: null,
            default: null,
            label: 'Cliente Nome'
        },
        type: {
            value: null,
            default: null,
            label: 'Tipo de movimentação'
        },
        types: {
            value: null,
            default: [],
            label: 'Tipo de movimentação'
        },
        status: {
            value: null,
            default: [],
            label: 'Situação de movimentação'
        },
        targetType: {
            value: null,
            default: null,
            label: 'Movimentação de'
        },
        operationType: {
            value: null,
            default: null,
            label: 'Operação de'
        },
        productId: {
            value: null,
            default: null,
            label: 'Produto'
        },
        accountId: {
            value: null,
            default: null,
            label: 'Conta'
        },
        userId: {
            value: null,
            default: null,
            label: 'Usuário'
        },
        startDate: {
            value: null,
            default: null,
            label: 'Data Inicio'
        },
        endDate: {
            value: null,
            default: null,
            label: 'Data Fim'
        }
    },
    pagination: {
        page: 1,
        itemsPerPage: 25,
        sortBy:  ['createdAt'],
        sortDesc: [true],
        multiSort: false
    },
    reservationPagination: {
        page: 1,
        itemsPerPage: 25,
        sortBy:  ['createdAt'],
        sortDesc: [true],
        multiSort: false
    }
}
