import axios from 'axios'
import store from '@/core/store'
import {LoadingScreen} from '@/core/utils'
import ApiErrorValidations from '@/core/exceptions/ApiErrorValidations'
import exceptionHandler from '@/core/exceptions/ExceptionHandler'

const loading = new LoadingScreen(store)

class InterceptadorHttp {
    async execute() {
        return new Promise((resolve) => {
            this.registrarInterceptadores()
            this.setarVariaveisFixasNoHeaderDaRequest()
            resolve()
        })
    }

    registrarInterceptadores() {
        axios.interceptors.request.use(this.tratarRequest, this.tratarErros)
        axios.interceptors.response.use(this.tratarResponse, this.tratarErros)
    }

    setarVariaveisFixasNoHeaderDaRequest() {
        // axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
        // axios.defaults.withCredentials = true
        //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('vue-token')
    }

    tratarRequest(config) {
        // loading.start()
        const token = localStorage.getItem('vue-token')
        console.log(token)
        if (token) {
            config.headers["Authorization"] = 'Bearer ' + token
        }
        return config
    }

    tratarResponse(response) {
        loading.stop()
        return response
    }

    tratarErros(error) {
        loading.stop()
        if (error.response.data && error.response.status !== 401) {
            throw new ApiErrorValidations(error.response.data.message, error.response)
        } else {
            exceptionHandler.handleUnauthorized()
        }
    }
}

export default new InterceptadorHttp()
