<template>
    <container-card>
        <v-data-table
            :headers="columns"
            :hide-default-footer="items.length < pagination.itemsPerPage"
            :items="items"
            :options="pagination"
            :search="search"
            :loading="loading"
            class="clickable"
            @click:row="clickRow">
            <template v-slot:item.date="{ item }">
                {{ item.date | date }}
            </template>
            <template v-slot:item.amount="{ item }">
                {{ item.amount | real }}
            </template>
            <template v-slot:item.action="{ item }">
                <v-icon>fa-angle-right</v-icon>
            </template>
        </v-data-table>
    </container-card>
</template>

<script>
    export default {
        props: {
            items: {
                type: Array
            },
            search: {
                type: String,
                default: ''
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
                        text: 'Nome',
                        align: 'left',
                        value: 'name',
                        width: '50%',
                        class: 'primary--text'
                    },
                    {
                        text: 'Date',
                        align: 'right',
                        value: 'date',
                        width: '30%',
                        class: 'primary--text'
                    },
                    {
                        text: 'Valor',
                        align: 'right',
                        value: 'amount',
                        width: '30%',
                        class: 'primary--text'
                    },
                    {
                        text: '',
                        align: 'left',
                        value: 'action',
                        width: '2%',
                        class: 'primary--text'
                    }
                ],
                pagination: {
                    itemsPerPage: 25
                }
            }
        },
        methods: {
            clickRow(item) {
                this.$emit('click:row', item)
            }
        }
    }
</script>

<style lang="stylus">
    @media (max-width: 720px)
        .tabela-usuarios
            td:nth-of-type(1):before
                content: "Nome:"

            td:nth-of-type(2):before
                content: "Saldo:"

            td:nth-of-type(3):before
                content: "Situação:"

            .table-actions
                display none !important

        .coluna-acoes-busca-conta
            display block
            width 70px

</style>
