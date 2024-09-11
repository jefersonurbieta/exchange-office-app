import {rolesTypes, routeTypes} from '@/core/constants'
import BalancePage from '@/modules/balance/view/BalancePage'

export default [
    {
        path: '/caixaGeral',
        name: routeTypes.BALANCE.VIEW,
        component: BalancePage,
        meta: {
            menu: {
                title: 'Caixa',
                icon: 'fa-light fa-box',
                order: 30
            },
            page: {
                title: 'Caixa',
                subtitle: 'Dados do caixa dos operadores'
            },
            authorities: [rolesTypes.ADMIN, rolesTypes.MANAGER, rolesTypes.MANAGER_VIEW]
        }
    },
]

