<template>
    <v-data-table :headers="columns"
                  :hide-default-footer="items.length < pagination.itemsPerPage"
                  :items="items"
                  :options="pagination">
        <template v-slot:item.grossAmount="{ item }">
            {{ item.grossAmount | real }}
        </template>
        <template v-slot:item.netAmount="{ item }">
            {{ item.netAmount | real }}
        </template>
        <template v-slot:item.expenses="{ item }">
            {{ item.expenses | real }}
        </template>
    </v-data-table>
</template>

<script>
export default {
    props: ['items'],
    data() {
        return {
            columns: [
                {
                    text: 'Mês',
                    align: 'left',
                    value: 'name',
                    class: 'primary--text'
                },
                {
                    text: 'Lucro Bruto',
                    align: 'right',
                    value: 'grossAmount',
                    class: 'primary--text'
                },
                {
                    text: 'Despesas',
                    align: 'right',
                    value: 'expenses',
                    class: 'primary--text'
                },
                {
                    text: 'Lucro Liquido',
                    align: 'right',
                    value: 'netAmount',
                    class: 'primary--text'
                }
            ],
            pagination: {
                itemsPerPage: 25,
                sortBy: ['valor'],
                descending: [true]
            }
        }
    }
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
