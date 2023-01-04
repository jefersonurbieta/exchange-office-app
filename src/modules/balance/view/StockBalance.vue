<template>
    <container-card title="Estoque" icon="fa-light fa-money-bill-1-wave">
        <v-data-table
            :headers="columns"
            :hide-default-footer="items.length < pagination.itemsPerPage"
            :items="items"
            :options="pagination"
            :search="search"
            :loading="loading">
            <template v-slot:item.amount="{ item }">
                {{ item.amount | value }}
            </template>
        </v-data-table>
    </container-card>
</template>

<script>

    export default {
        props: {
            items: {
                type: Array,
                default: () => []
            },
            search: {
                type: String
            },
            loading: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                columns: [
                    {
                        text: 'Produto',
                        align: 'left',
                        value: 'name',
                        width: '60%',
                        class: 'primary--text'
                    },
                    {
                        text: 'Quantidade',
                        align: 'right',
                        value: 'amount',
                        width: '30%',
                        class: 'primary--text'
                    }
                ],
                pagination: {
                    itemsPerPage: 50
                }
            }
        }
    }
</script>

<style lang="stylus">
@media (max-width: 720px)
    .tabela-usuarios
        td:nth-of-type(1):before
            content: "Produto:"

        td:nth-of-type(2):before
            content: "Quantidade:"

</style>
