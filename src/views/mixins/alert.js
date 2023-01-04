import {defaultMessages, defaultNotifications, mutationTypes} from '@/core/constants'

export default {
    methods: {
        showErrorNotification(message = defaultNotifications.ERRO_DEFAULT) {
            if (message === 'GENERAL') {
                message = defaultMessages.DISCONNECTED
            }
            this.$store.commit(mutationTypes.LOKI.SHOW_ALERT, {
                message,
                type: 'error'
            })
        },
        showSuccessNotification(message = defaultNotifications.SUCESSO_DEFAULT) {
            this.$store.commit(mutationTypes.LOKI.SHOW_ALERT, {
                message,
                type: 'success'
            })
        },
        showWarningNotification(message) {
            this.$store.commit(mutationTypes.LOKI.SHOW_ALERT, {
                message,
                type: 'warning'
            })
        }
    }
}
