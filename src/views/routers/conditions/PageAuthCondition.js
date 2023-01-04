import store from '@/core/store'

class PageAuthCondition {
    shouldExecute(to) {
        return !this.runningCondition(to) && !store.state.loki.user.userId
    }

    runningCondition(to) {
        return to.name === 'Login'
    }

    execute(to, from, next) {
        next({name: 'Login'})
    }
}

export default new PageAuthCondition()
