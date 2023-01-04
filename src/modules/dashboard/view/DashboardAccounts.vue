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

    import {actionTypes} from '@/core/constants'

    export default {
        data() {
            return {
                loading: true,
                search: '',
                items: [],
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
        },
        async mounted() {
            await this.getAccounts()
            this.loading = false
        },
        methods: {
            async getAccounts() {
                this.items = await this.$store.dispatch(actionTypes.ACCOUNT.FIND_ALL_COMPLETE, {general: true})
            }
        }
    }

</script>

<style scoped>
</style>
