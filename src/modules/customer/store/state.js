import {statusTypes} from '@/core/constants'

export default {
    defaultObject: {
        status: statusTypes.ACTIVATED
    },
    filter: {
        name: {
            value: null,
            default: null,
            label: 'Nome'
        },
        email: {
            value: null,
            default: null,
            label: 'E-mail'
        },
        kindPerson: {
            value: null,
            default: null,
            label: 'Tipo Pessoa'
        },
        cpfCnpj: {
            value: null,
            default: null,
            label: 'CPF/CNPJ'
        },
        country: {
            value: null,
            default: null,
            label: 'País'
        },
        state: {
            value: null,
            default: null,
            label: 'Estado'
        },
        city: {
            value: null,
            default: null,
            label: 'Cidade'
        },
        birthdayMonth: {
            value: null,
            default: null,
            label: 'Mês de aniversário'
        },
        status: {
            value: null,
            default: null,
            label: 'Situação'
        }
    },
    defaultFilter: {
        name: {
            value: null,
            default: null,
            label: 'Nome'
        },
        email: {
            value: null,
            default: null,
            label: 'E-mail'
        },
        kindPerson: {
            value: null,
            default: null,
            label: 'Tipo Pessoa'
        },
        cpfCnpj: {
            value: null,
            default: null,
            label: 'CPF/CNPJ'
        },
        country: {
            value: null,
            default: null,
            label: 'País'
        },
        state: {
            value: null,
            default: null,
            label: 'Estado'
        },
        city: {
            value: null,
            default: null,
            label: 'Cidade'
        },
        birthdayMonth: {
            value: null,
            default: null,
            label: 'Mês de aniversário'
        },
        status: {
            value: null,
            default: null,
            label: 'Situação'
        }
    },
    pagination: {
        page: 1,
        itemsPerPage: 25,
        sortBy:  ['createdAt'],
        sortDesc: [true],
        multiSort: false
    }
}
