import {actionTypes} from '@/core/constants'
import Http from '@/core/utils/Http'

export default {

    async [actionTypes.CUSTOMER.FIND_ALL]() {
        const {data} = await Http.get('api/customer')
        return data
    },

    async [actionTypes.CUSTOMER.ADVANCED_SEARCH](context, {filter, pagination}) {
        const filterToSend = {}
        for (let [key] of Object.entries(filter)) {
            if (filter[key] && filter[key].value) {
                if (typeof filter[key].value === 'object') {
                    filterToSend[key] = filter[key].value[filter[key].fieldValue]
                } else {
                    filterToSend[key] = filter[key].value
                }
            }
        }

        filterToSend.page = pagination.page - 1
        filterToSend.size = pagination.itemsPerPage
        filterToSend.sortBy = pagination.sortBy[0]
        filterToSend.sortDesc = pagination.sortDesc[0]

        const {data} = await Http.post('api/customer/advanced-search', filterToSend)
        return data
    },

    async [actionTypes.CUSTOMER.FIND_BY_ID](context, id) {
        const {data} = await Http.get(`api/customer/${id}`)
        return data
    },

    async [actionTypes.CUSTOMER.SAVE](context, item) {
        if (item.id) {
            const {data} = await Http.put(`api/customer/${item.id}`, item)
            return data
        } else {
            const {data} = await Http.post('api/customer', item)
            return data
        }
    },

    async [actionTypes.CUSTOMER.REMOVE](context, id) {
        await Http.delete(`api/customer/${id}`)
    },

    async [actionTypes.CUSTOMER.FIND_ZIP_CODE](context, cep) {
        const cepNumeral = cep.replace(/[^0-9]/g, '')

        const linkQuery = `https://viacep.com.br/ws/${cepNumeral}/json`
        const {data} = await Http.get(linkQuery)

        return data
    },

    async [actionTypes.CUSTOMER.EXPORT_CSV]() {
        const response = await Http.get('api/customer/csv', {responseType: 'blob'})
        const blob = new Blob([response.data], { type: 'text/csv' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'clientes'
        link.click()
        URL.revokeObjectURL(link.href)
    },
}
