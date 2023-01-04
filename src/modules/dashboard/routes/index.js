import {routeTypes} from '@/core/constants'
import Dashboard from '@/modules/dashboard/view/Dashboard'

export default [
    {
        path: '/dashboard',
        name: routeTypes.DASHBOARD.VIEW,
        component: Dashboard,
        meta: {
            page: {
                title: 'Dashboard'
            },
            menu: {
                title: 'Dashboard',
                icon: 'fa-light fa-chart-line',
                order: 10
            }
        }
    },
]

