export default {
    filter: {
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
        sortBy: ['createdAt'],
        sortDesc: [true],
        multiSort: false
    }
}
