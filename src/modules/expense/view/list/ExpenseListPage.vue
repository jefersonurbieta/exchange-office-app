<template>
    <page-container manager-view>
        <search-row
            v-model="search"
            :showNew="true"
            :adminNew="true"
            @new="newItem()"/>

        <expense-table
            :items="items"
            :search="search"
            :loading="loading"
            @click:row="clickRow"/>
    </page-container>
</template>

<script>
    import {actionTypes, routeTypes} from '@/core/constants'
    import ExpenseTable from './ExpenseTable'

    export default {
        components: {ExpenseTable},
        data() {
            return {
                search: '',
                loading: true,
                items: []
            }
        },
        async mounted() {
            await this.query()
            this.loading = false
        },
        methods: {
            async query() {
                this.items = await this.$store.dispatch(actionTypes.EXPENSE.FIND_ALL_COMPLETE, {general: true})
            },
            clickRow(item) {
                this.$router.push({name: routeTypes.EXPENSE.EDIT, params: {id: item.id}})
            },
            newItem() {
                this.$router.push({name: routeTypes.EXPENSE.NEW})
            }
        }
    }
</script>
