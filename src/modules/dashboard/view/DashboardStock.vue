<template>
    <az-container>
        <container-card title="Estoque Geral" icon="fa-light fa-money-bill-1-wave">
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
                <template v-slot:item.cost="{ item }">
                    <span v-if="item.showCost">{{ item.cost | real(item.quantityDecimalPlacesValue) }}</span>
                </template>
                <template v-slot:item.total="{ item }">
                    <span v-if="item.showAmount && item.showCost">{{ calcTotal(item) | real }}</span>
                </template>
            </v-data-table>
        </container-card>
    </az-container>
</template>

<script>

import {NumberUtils} from "@/core/utils";

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
                {text: 'Custo', align: 'right', value: 'cost'},
                {text: 'Total', align: 'right', value: 'total'}
            ]
        }
    },
    computed: {
        total() {
            return this.items.reduce((total, item) => total + ((item.amount ? item.amount : 0) * (item.cost ? item.cost : 0)), 0)
        }
    },
    methods: {
        calcTotal(item) {
            return NumberUtils.roundValue((item.amount ? item.amount : 0) * (item.cost ? item.cost : 0))
        }
    }
}
</script>
