<template>
    <az-container>
        <container-card title="Caixa" icon="fa-light fa-building-columns">
            <v-data-table
                :headers="columns"
                :items="items"
                :options="pagination"
                :loading="loading"
                :hide-default-footer="items.length < pagination.itemsPerPage">
                <template v-slot:item.balance="{ item }">
                    {{ item.balance | real }}
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
            search: '',
            pagination: {
                itemsPerPage: 50,
                sortBy: [],
                sortDesc: []
            },
            columns: [
                {text: 'Nome', align: 'left', value: 'name'},
                {text: 'Saldo', align: 'right', value: 'balance'},
            ]
        }
    },
    computed: {
        total() {
            return this.items.reduce((total, item) => total + item.balance, 0)
        }
    }
}
</script>
