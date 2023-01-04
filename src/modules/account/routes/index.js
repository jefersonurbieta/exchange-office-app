import {rolesTypes, routeTypes} from '@/core/constants'
import AccountListPage from '@/modules/account/view/list/AccountListPage'
import AccountEditPage from '@/modules/account/view/edit/AccountEditPage'

export default [
    {
        path: '/conta',
        name: routeTypes.ACCOUNT.LIST,
        component: AccountListPage,
        meta: {
            menu: {
                title: 'Conta',
                icon: 'fa-light fa-building-columns',
                order: 50
            },
            page: {
                title: 'Contas',
                subtitle: 'Lista geral de Contas'
            },
            authorities: [rolesTypes.ADMIN, rolesTypes.MANAGER]
        }
    },
    {
        path: '/conta/novo',
        name: routeTypes.ACCOUNT.NEW,
        component: AccountEditPage,
        meta: {
            page: {
                title: 'Contas',
                subtitle: 'Nova conta'
            },
            authorities: [rolesTypes.ADMIN, rolesTypes.MANAGER]
        }
    },
    {
        path: '/conta/:id',
        name: routeTypes.ACCOUNT.EDIT,
        component: AccountEditPage,
        meta: {
            page: {
                title: 'Contas',
                subtitle: 'Dados de Conta'
            },
            authorities: [rolesTypes.ADMIN, rolesTypes.MANAGER]
        }
    },
]

