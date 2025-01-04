import {rolesTypes, routeTypes} from '@/core/constants'
import UserListPage from '@/modules/user/view/list/UserListPage'
import UserEditPage from '@/modules/user/view/edit/UserEditPage'

export default [
    {
        path: '/cadastro/usuarios',
        name: routeTypes.USER.LIST,
        component: UserListPage,
        meta: {
            menu: {
                title: 'Usuário',
                icon: 'fa-light fa-users',
                order: 70
            },
            page: {
                title: 'Usuários',
                subtitle: 'Lista geral dos Usuários'
            },
            authorities: [rolesTypes.ADMIN]
        }
    },
    {
        path: '/configuracao/usuarios/novo',
        name: routeTypes.USER.NEW,
        component: UserEditPage,
        meta: {
            page: {
                title: 'Usuários',
                subtitle: 'Novo Usuário'
            },
            authorities: [rolesTypes.ADMIN]
        }
    },
    {
        path: '/configuracao/usuarios/:id',
        name: routeTypes.USER.EDIT,
        component: UserEditPage,
        meta: {
            page: {
                title: 'Usuários',
                subtitle: 'Detalhes do Usuário'
            },
            authorities: [rolesTypes.ADMIN]
        }
    }
]

