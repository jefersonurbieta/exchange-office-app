import Vue from 'vue'
import RootPage from '@/views/pages/RootPage.vue'
import router from '@/views/routers'
import store from '@/core/store'
import { mutationTypes } from '@/core/constants'
import vuetify from '@/plugins/vuetify'
import {buildMenu} from '@/core/utils'
import ExceptionHandler from '@/core/exceptions/ExceptionHandler'

class RootPageCreator {
    createInstance() {
        new Vue({
            router,
            store,
            vuetify,
            render: h => h(RootPage),
            created() {
                this.$store.commit(mutationTypes.LOKI.SET_MENU_ACTIONS, buildMenu(store, router))
            },
            errorCaptured(error) {
                const exceptionHandler = new ExceptionHandler(store, router)
                exceptionHandler.execute(error)
                return false
            }
        }).$mount('#app')
    }

    createBootstrapError() {
        new Vue({
            el: '#app',
            render(createElement) {
                return createElement('div', {
                    'class': 'erro-inicializacao'
                }, [
                    createElement('div', {}, [
                        createElement('i', {
                            'class': 'far fa-surprise'
                        }),
                        createElement('p', 'Ocorreu um erro na inicialização desta aplicação.')
                    ])
                ])
            }
        })
    }
}

export default new RootPageCreator()
