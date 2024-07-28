<template>
    <az-container>
        <v-data-table :headers="columns"
                      :hide-default-footer="items.length < pagination.itemsPerPage"
                      :items="items"
                      :options="pagination">
            <template v-slot:item.amount="{ item }">
                {{ item.amount | real }}
            </template>
            <template v-slot:item.sale="{ item }">
                {{ item.sale | real }}
            </template>
            <template v-slot:item.purchase="{ item }">
                {{ item.purchase | real }}
            </template>
        </v-data-table>
    </az-container>
</template>

<script>

export default {
    props: ['items'],
    data() {
        return {
            columns: [
                {
                    text: 'Produto',
                    align: 'left',
                    value: 'name',
                    class: 'primary--text'
                },
                {
                    text: 'Valor',
                    align: 'right',
                    value: 'amount',
                    class: 'primary--text'
                },
                {
                    text: 'Venda',
                    align: 'right',
                    value: 'sale',
                    class: 'primary--text'
                },
                {
                    text: 'Compra',
                    align: 'right',
                    value: 'purchase',
                    class: 'primary--text'
                }
            ],
            pagination: {
                itemsPerPage: 15,
                sortBy: ['valor'],
                descending: [true]
            }
        }
    },
}
</script>

<style lang="stylus">
.v-datatable__expand-row td, .v-datatable__expand-row tr {
    background-color: rgba(0, 0, 0, 0.019);
}

@media (max-width: 720px)
    .tabela-usuarios
        td:nth-of-type(1):before
            content: "Produto:"

        td:nth-of-type(2):before
            content: "Valor:"

        .table-actions
            display none !important

</style>
