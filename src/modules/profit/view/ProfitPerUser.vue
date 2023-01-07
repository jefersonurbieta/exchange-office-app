<template>
    <az-container>
        <v-data-table :headers="columns"
                      :hide-default-footer="items.length < pagination.itemsPerPage"
                      :items="items"
                      :options="pagination">
            <template v-slot:item.amount="{ item }">
                {{ item.amount | real }}
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
                    text: 'Usuário',
                    align: 'left',
                    value: 'name',
                    class: 'primary--text'
                },
                {
                    text: 'Valor',
                    align: 'right',
                    value: 'amount',
                    class: 'primary--text'
                }
            ],
            pagination: {
                itemsPerPage: 15,
                sortBy: ['valor'],
                descending: [true]
            }
        }
    }
}
</script>

<style lang="stylus">
@media (max-width: 720px)
    .tabela-usuarios
        td:nth-of-type(1):before
            content: "Usuário:"

        td:nth-of-type(2):before
            content: "Valor:"

        .table-actions
            display none !important

</style>
