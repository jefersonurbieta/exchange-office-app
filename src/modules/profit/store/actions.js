import { actionTypes } from '@/core/constants'
import Http from '@/core/utils/Http'

export default {

    async [actionTypes.PROFIT.BUSCAR_LUCRO_GERAL](context, filtro) {
        const {data} = await Http.post('api/movimentacao/lucro/geral', filtro)
        return data.data
    },

    async [actionTypes.PROFIT.BUSCAR_LUCRO_POR_PRODUTOS]() {
        const {data} = await Http.get('api/produtos/lucroPorProduto')
        return data.data
    },

    async [actionTypes.PROFIT.BUSCAR_LUCRO_POR_USUARIOS]() {
        const {data} = await Http.get('api/produtos/lucroPorUsuario')
        return data.data
    }
}
