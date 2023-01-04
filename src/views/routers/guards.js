import conditions from './conditions'
import store from '@/core/store'
import {Alert} from '@/core/utils'

const alert = new Alert(store)

class RouterGuards {

    async conditions(to, from, next) {
        const tasks = Object.keys(conditions)
        let nextExecuted = false

        nextExecuted = await tasks.some((condition) => {
            if (conditions[condition].runningCondition(to, from)) {
                next()
                return true
            }
            return false
        })

        if (!nextExecuted) {
            nextExecuted = await tasks.some((condition) => {
                if (conditions[condition].shouldExecute(to, from)) {
                    conditions[condition].execute(to, from, next)
                    return true
                }
                return false
            })
        }

        if (!nextExecuted) {
            if (to.meta.requiresAuth) {
                const permissionValid = store.state.loki.user.authorities.every(element => to.meta.authorities.indexOf(element.name) > -1)
                if (permissionValid) {
                    next()
                } else {
                    alert.showError('Você não possui permissão de acesso.')
                    next({name: from.name})
                }
            } else {
                next()
            }
        }
    }
}

export default new RouterGuards()

