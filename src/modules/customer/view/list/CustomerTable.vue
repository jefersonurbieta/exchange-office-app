<template>
    <container-card>
        <v-data-table
            :headers="columns"
            :items="items"
            :server-items-length="totalItems"
            :options.sync="pagination"
            :footer-props="footerProps"
            :search="search"
            :loading="loading"
            class="clickable"
            @update:options="alterOptions"
            @click:row="clickRow">
            <template v-slot:item.action="{ item }">
                <v-icon>fa-angle-right</v-icon>
            </template>
        </v-data-table>
    </container-card>
</template>

<script>
    import {mutationTypes} from '@/core/constants'

    export default {
        props: {
            items: {
                type: Array
            },
            totalItems: {
                type: Number,
                default: 0
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
                pagination: {
                    page: 1,
                    itemsPerPage: 25,
                    sortBy: ['createdAt'],
                    sortDesc: [true],
                    multiSort: false
                },
                columns: [
                    {
                        text: 'Nome',
                        align: 'left',
                        value: 'name',
                        width: '40%',
                        class: 'primary--text'
                    },
                    {
                        text: 'E-mail',
                        align: 'left',
                        value: 'email',
                        width: '20%',
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
                footerProps: {
                    itemsPerPageOptions: [5, 10, 25, 50, 100, 250]
                }
            }
        },
        methods: {
            alterOptions(options) {
                this.$store.commit(mutationTypes.CUSTOMER.SET_PAGINATION, options)
                this.$emit('changePage', options)
            },
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
            content: "E-mail:"

        td:nth-of-type(3):before
            content: "CPF/CNPJ:"

        td:nth-of-type(4):before
            content: "Telefone:"

        td:nth-of-type(5):before
            content: "Situação:"

        .table-actions
            display none !important

    .coluna-acoes-busca-cliente
        display block
        width 70px

</style>
