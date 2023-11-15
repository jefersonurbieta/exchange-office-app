<template>
    <az-container>
        <container-card title="Meu Estoque" icon="fa-light fa-money-bill-1-wave">
            <v-data-table
                :headers="columns"
                :items="items"
                :options="pagination"
                :loading="loading"
                :hide-default-footer="items.length < pagination.itemsPerPage">
                <template v-slot:item.amount="{ item }">
                    <span v-if="item.showAmount">
                        {{ item.amount | value(item.quantityDecimalPlacesAmount) }}
                    </span>
                </template>
                <template v-slot:item.reservedAmount="{ item }">
                    <span v-if="item.showAmount">
                        {{ item.reservedAmount | value(item.quantityDecimalPlacesAmount) }}
                    </span>
                </template>
            </v-data-table>
        </container-card>
    </az-container>
</template>

<script>
export default {
    props: {
        items: {
            type: Array
        },
        loading: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            pagination: {
                itemsPerPage: 50,
                sortBy: [],
                sortDesc: []
            },
            columns: [
                {text: 'Nome', align: 'left', value: 'name'},
                {text: 'Quantidade', align: 'right', value: 'amount'},
                {text: 'Reservado', align: 'right', value: 'reservedAmount'},
            ]
        }
    }
}
</script>
