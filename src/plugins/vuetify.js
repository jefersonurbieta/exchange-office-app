import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import pt from 'vuetify/es5/locale/pt'

Vue.use(Vuetify)

export default new Vuetify({
    icons: {
        iconfont: 'md',
    },
    lang: {
        locales: { pt },
        current: 'pt'
    },
    theme: {
        themes: {
            light: {
                primary: '#39866C',
                secondary: '#D6B469',
                accent: '#0059B2'
            }
        }
    },
    options: {
        customProperties: true
    }
})
