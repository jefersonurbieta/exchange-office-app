import Logout from '@/modules/auth/view/logout/Logout'
import Profile from '@/modules/auth/view/profile/Profile'
import CurrentCompany from '@/modules/auth/view/current-company/CurrentCompany'
import {routeTypes} from '@/core/constants'

export default [
    {
        path: '/logout',
        name: routeTypes.AUTH.LOGOUT,
        component: Logout
    },
    {
        path: '/profile',
        name: routeTypes.AUTH.PROFILE,
        component: Profile,
        meta: {
            page: {
                title: 'Perfil',
                subtitle: 'Dados do usuario'
            }
        }
    },
    {
        path: '/current-company',
        name: routeTypes.AUTH.CURRENT_COMPANY,
        component: CurrentCompany,
        meta: {
            page: {
                title: 'Empresa',
                subtitle: 'Dados da empresa'
            }
        }
    },
]

