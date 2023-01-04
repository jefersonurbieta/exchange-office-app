import {routeTypes} from '@/core/constants'
import MovementListPage from '@/modules/movement/view/list/MovementListPage'
import ReservationListPage from '@/modules/movement/view/list/ReservationListPage'
import MovementEditPage from '@/modules/movement/view/edit/MovementEditPage'
import ReservationEditPage from '@/modules/movement/view/edit/ReservationEditPage'

export default [
    {
        path: '/movement',
        name: routeTypes.MOVEMENT.LIST,
        component: MovementListPage,
        meta: {
            menu: {
                title: 'Movimentação',
                icon: 'fa-thin fa-star',
                order: 20
            },
            page: {
                title: 'Movimentações',
                subtitle: 'Lista geral de Movimentações'
            }
        }
    },
    {
        path: '/movement/new',
        name: routeTypes.MOVEMENT.NEW,
        component: MovementEditPage,
        meta: {
            page: {
                title: 'Movimentações',
                subtitle: 'Nova Movimentação'
            }
        }
    },
    {
        path: '/movement/:id',
        name: routeTypes.MOVEMENT.EDIT,
        component: MovementEditPage,
        meta: {
            page: {
                title: 'Movimentações',
                subtitle: 'Dados da Movimentação'
            },
            windowRedirectAfter: true
        }
    },
    {
        path: '/reservation',
        name: routeTypes.RESERVATION.LIST,
        component: ReservationListPage,
        meta: {
            menu: {
                title: 'Reserva',
                icon: 'fa-thin fa-phone',
                order: 21
            },
            page: {
                title: 'Reservas',
                subtitle: 'Lista geral de Reservas'
            }
        }
    },
    {
        path: '/reservation/new',
        name: routeTypes.RESERVATION.NEW,
        component: ReservationEditPage,
        meta: {
            page: {
                title: 'Reservas',
                subtitle: 'Nova Reserva'
            }
        }
    },
    {
        path: '/reservation/:id',
        name: routeTypes.RESERVATION.EDIT,
        component: ReservationEditPage,
        meta: {
            page: {
                title: 'Reservas',
                subtitle: 'Dados da Reserva'
            },
            windowRedirectAfter: true
        }
    },
]

