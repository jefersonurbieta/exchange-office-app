import {actionTypes} from '@/core/constants'
import Http from '@/core/utils/Http'
import moment from 'moment'

export default {

    async [actionTypes.MOVEMENT.FIND_BY_ID](context, id) {
        const {data} = await Http.get(`api/movement/${id}`)
        return data
    },

    async [actionTypes.MOVEMENT.SAVE](context, item) {
        if (item.id) {
            const {data} = await Http.put(`api/movement/${item.id}`, item)
            return data
        } else {
            const {data} = await Http.post('api/movement', item)
            return data
        }
    },

    async [actionTypes.MOVEMENT.FINISH](context, id) {
        const {data} = await Http.put(`api/movement/${id}/finish`)
        return data
    },

    async [actionTypes.MOVEMENT.CANCEL](context, id) {
        const {data} = await Http.put(`api/movement/${id}/cancel`)
        return data
    },

    async [actionTypes.MOVEMENT.ADVANCED_SEARCH](context, {filter, pagination}) {
        const filterToSend = {}
        for (let [key] of Object.entries(filter)) {
            if (filter[key] && filter[key].value) {
                if(key === 'startDate' || key === 'endDate') {
                    console.log(filter[key].value)
                    console.log(moment(filter[key].value).format('yyyy-MM-DD'))
                    filterToSend[key] = moment(filter[key].value).format('yyyy-MM-DD');
                } else {
                    filterToSend[key] = filter[key].value
                }
            }
        }

        filterToSend.page = pagination.page - 1
        filterToSend.size = pagination.itemsPerPage
        filterToSend.sortBy = pagination.sortBy[0]
        filterToSend.sortDesc = pagination.sortDesc[0]

        const {data} = await Http.post('api/movement/advanced-search', filterToSend)
        return data
    },

    async [actionTypes.MOVEMENT.REMOVE](context, id) {
        await Http.delete(`api/movement/${id}`)
    },

    async [actionTypes.MOVEMENT.FIND_LAST_PRODUCT_INPUT_ID](context, productId) {
        const {data} = await Http.get(`api/movement/last-input-product/${productId}`)
        return data
    },

    async [actionTypes.MOVEMENT.PRINT](context, {movement, company}) {
        const form = document.createElement("form");
        form.target = '_blank'
        form.method = 'POST'
        form.action = `${process.env.VUE_APP_RECEIPT_URL}/receipt`
        form.style.display = 'none'

        const movementInput = document.createElement('input');
        movementInput.type = 'hidden'
        movementInput.name = 'movement'
        movementInput.value = JSON.stringify(movement)

        form.appendChild(movementInput);

        const companyInput = document.createElement('input');
        companyInput.type = 'hidden'
        companyInput.name = 'company'
        companyInput.value = JSON.stringify(company)

        form.appendChild(companyInput);

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    },
}
