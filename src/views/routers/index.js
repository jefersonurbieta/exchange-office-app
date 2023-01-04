import Router from 'vue-router'
import goTo from 'vuetify/es5/services/goto'
import guards from './guards'
import common from './routes/common'
import modules from './routes/modules'
import {routeTypes} from '@/core/constants'

const index = new Router({
    routes: [
        {
            path: '/',
            name: routeTypes.COMMON.HOME,
            redirect: () => {
                return { name: routeTypes.DASHBOARD.VIEW }
            },
        },
        ...common,
        ...modules,
    ],
    scrollBehavior: (to, from, savedPosition) => {
        let scrollTo = 0

        if (to.hash) {
            scrollTo = to.hash
        } else if (savedPosition) {
            scrollTo = savedPosition.y
        }

        return goTo(scrollTo)
    },
})

index.beforeEach((to, from, next) => guards.conditions(to, from, next))

export default index
