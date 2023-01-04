import {routeTypes} from '@/core/constants'
import CustomerListPage from '@/modules/customer/view/list/CustomerListPage'
import CustomerEditPage from '@/modules/customer/view/edit/CustomerEditPage'

export default [
    {
        path: '/clientes',
        name: routeTypes.CUSTOMER.LIST,
        component: CustomerListPage,
        meta: {
            menu: {
                title: 'Cliente',
                icon: 'fa-light fa-people-group',
                order: 40
            },
            page: {
                title: 'Clientes',
                subtitle: 'Lista geral de Clientes'
            }
        }
    },
    {
        path: '/clientes/novo',
        name: routeTypes.CUSTOMER.NEW,
        component: CustomerEditPage,
        meta: {
            page: {
                title: 'Clientes',
                subtitle: 'Novo Cliente'
            }
        }
    },
    {
        path: '/clientes/:id',
        name: routeTypes.CUSTOMER.EDIT,
        component: CustomerEditPage,
        meta: {
            page: {
                title: 'Clientes',
                subtitle: 'Dados do Cliente'
            }
        }
    },
]

