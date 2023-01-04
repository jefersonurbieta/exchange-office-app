import {routeTypes} from '@/core/constants'
import InstallmentPage from '@/modules/installment/view/InstallmentPage'

export default [
    {
        path: '/installment',
        name: routeTypes.INSTALLMENT.LIST,
        component: InstallmentPage,
        meta: {
            menu: {
                title: 'Parcelamento',
                icon: 'fa-light fa-list-ol',
                order: 50,
                rule: (store) => store.state.loggedCompany.installmentConfig.enabled
            },
            page: {
                title: 'Simulador de parcelamento',
                subtitle: ''
            }
        }
    }
]

