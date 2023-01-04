import moment from 'moment-timezone'
import { mutationTypes, product } from '@/core/constants'
import store from '@/core/store'

class SetTimezoneListener {
    async execute() {
        moment.tz.setDefault('America/Campo_Grande')
        moment.locale('pt')
        return store.commit(mutationTypes.LOKI.SET_TIMEZONE, 'America/Campo_Grande')
    }
}

export default new SetTimezoneListener()
