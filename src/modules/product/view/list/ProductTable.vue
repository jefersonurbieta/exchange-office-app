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
            <template v-slot:item.status="{ item }">
                {{ item.status | status }}
            </template>
            <template v-slot:item.amount="{ item }">
                <span v-if="item.showAmount">{{ item.amount | value(item.quantityDecimalPlacesAmount) }}</span>
            </template>
            <template v-slot:item.cost="{ item }">
                <span v-if="item.showCost">{{ item.cost | real(item.quantityDecimalPlacesValue) }}</span>
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
                        width: '35%',
                        class: 'primary--text'
                    },
                    {
                        text: 'Sigla',
                        align: 'left',
                        value: 'initials',
                        width: '10%',
                        class: 'primary--text'
                    },
                    {
                        text: 'Quantidade',
                        align: 'right',
                        value: 'amount',
                        width: '20%',
                        class: 'primary--text'
                    },
                    {
                        text: 'Custo',
                        align: 'right',
                        value: 'cost',
                        width: '20%',
                        class: 'primary--text'
                    },
                    {
                        text: 'Situação',
                        align: 'left',
                        value: 'status',
                        width: '10%',
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
            content: "Sigla:"

        td:nth-of-type(3):before
            content: "Quantidade:"

        td:nth-of-type(4):before
            content: "Custo:"

        td:nth-of-type(5):before
            content: "Situação:"

        .table-actions
            display none !important

    .coluna-acoes-busca-produto
        display block
        width 70px
</style>
