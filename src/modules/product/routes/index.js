import {rolesTypes, routeTypes} from '@/core/constants'
import ProductListPage from '@/modules/product/view/list/ProductListPage'
import ProductEditPage from '@/modules/product/view/edit/ProductEditPage'

export default [
    {
        path: '/produtos',
        name: routeTypes.PRODUCT.LIST,
        component: ProductListPage,
        meta: {
            menu: {
                title: 'Produto',
                icon: 'fa-light fa-money-bill-1-wave',
                order: 60
            },
            page: {
                title: 'Produtos',
                subtitle: 'Lista geral dos Produtos'
            },
            authorities: [rolesTypes.ADMIN, rolesTypes.MANAGER]
        }
    },
    {
        path: '/produtos/novo',
        name: routeTypes.PRODUCT.NEW,
        component: ProductEditPage,
        meta: {
            page: {
                title: 'Produtos',
                subtitle: 'Novo Produto'
            },
            authorities: [rolesTypes.ADMIN, rolesTypes.MANAGER]
        }
    },
    {
        path: '/produtos/:id',
        name: routeTypes.PRODUCT.EDIT,
        component: ProductEditPage,
        meta: {
            page: {
                title: 'Produto',
                subtitle: 'Dados do Produto'
            },
            authorities: [rolesTypes.ADMIN, rolesTypes.MANAGER]
        }
    },
]

