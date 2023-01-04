import {routeTypes} from '@/core/constants'
import OperationListPage from '@/modules/closure/view/list/ClosureListPage'
import OperationEditPage from '@/modules/closure/view/edit/ClosureEditPage'

export default [
    {
        path: '/closure',
        name: routeTypes.CLOSURE.LIST,
        component: OperationListPage,
        meta: {
            menu: {
                title: 'Fechamento',
                icon: 'fa-thin fa-lock',
                order: 21
            },
            page: {
                title: 'Fechamento',
                subtitle: 'Lista de Fechamentos'
            }
        }
    },
    {
        path: '/closure/:id',
        name: routeTypes.CLOSURE.EDIT,
        component: OperationEditPage,
        meta: {
            page: {
                title: 'Fechamento',
                subtitle: 'Dados do Fechamento'
            },
            windowRedirectAfter: true
        }
    },
]

