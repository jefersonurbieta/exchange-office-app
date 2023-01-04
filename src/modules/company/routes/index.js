import {rolesTypes, routeTypes} from '@/core/constants'
import CompanyListPage from '@/modules/company/view/list/CompanyListPage'
import CompanyEditPage from '@/modules/company/view/edit/CompanyEditPage'

export default [
    {
        path: '/company',
        name: routeTypes.COMPANY.LIST,
        component: CompanyListPage,
        meta: {
            menu: {
                title: 'Empresas',
                icon: 'fa-light fa-building',
                order: 50
            },
            page: {
                title: 'Empresas',
                subtitle: 'Lista geral de Empresas'
            },
            authorities: [rolesTypes.ADMIN]
        }
    },
    {
        path: '/company/new',
        name: routeTypes.COMPANY.NEW,
        component: CompanyEditPage,
        meta: {
            page: {
                title: 'Empresas',
                subtitle: 'Nova Empresa'
            },
            authorities: [rolesTypes.ADMIN]
        }
    },
    {
        path: '/company/:id',
        name: routeTypes.COMPANY.EDIT,
        component: CompanyEditPage,
        meta: {
            page: {
                title: 'Empresas',
                subtitle: 'Dados da Empresa'
            },
            authorities: [rolesTypes.ADMIN, rolesTypes.MANAGER]
        }
    },
]

