import {rolesTypes, routeTypes} from '@/core/constants'
import ExpenseListPage from '@/modules/expense/view/list/ExpenseListPage'
import ExpenseEditPage from '@/modules/expense/view/edit/ExpenseEditPage'

export default [
    {
        path: '/expense',
        name: routeTypes.EXPENSE.LIST,
        component: ExpenseListPage,
        meta: {
            menu: {
                title: 'Despesas',
                icon: 'fa-light fa-building-columns',
                order: 100
            },
            page: {
                title: 'Despesas',
                subtitle: 'Lista de Despesas'
            },
            authorities: [rolesTypes.ADMIN, rolesTypes.MANAGER]
        }
    },
    {
        path: '/expense/new',
        name: routeTypes.EXPENSE.NEW,
        component: ExpenseEditPage,
        meta: {
            page: {
                title: 'Despesas',
                subtitle: 'Nova Despesa'
            },
            authorities: [rolesTypes.ADMIN, rolesTypes.MANAGER]
        }
    },
    {
        path: '/expense/:id',
        name: routeTypes.EXPENSE.EDIT,
        component: ExpenseEditPage,
        meta: {
            page: {
                title: 'Despesas',
                subtitle: 'Dados de Despesa'
            },
            authorities: [rolesTypes.ADMIN, rolesTypes.MANAGER]
        }
    },
]

