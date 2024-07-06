import {rolesTypes, routeTypes} from '@/core/constants'
import ProfitPage from '@/modules/profit/view/ProfitPage'

export default [
    {
        path: '/lucro',
        name: routeTypes.PROFIT.VIEW,
        component: ProfitPage,
        meta: {
            menu: {
                title: 'Lucro',
                icon: 'fa-solid fa-wallet'
            },
            page: {
                title: 'Lucro',
                subtitle: 'Informações sobre o lucro obtido'
            },
            authorities: [rolesTypes.OWNER]
        }
    },
]

