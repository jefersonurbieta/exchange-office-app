import PageNotFound from '@/views/pages/PageNotFound'
import {routeTypes} from '@/core/constants'


export default [
    {
        path: '*',
        name: routeTypes.COMMON.PAGE_NOT_FOUND,
        component: PageNotFound,
        meta: {
            page: {
                title: 'Ooops',
                subtitle: 'Página não encontrada'
            }
        }
    }
]
