<template>
    <page-container manager-view>
        <search-row
            v-model="search"
            :showNew="true"
            :adminNew="true"
            @new="newItem()"/>

        <account-table
            :items="items"
            :search="search"
            :loading="loading"
            @click:row="clickRow"/>
    </page-container>
</template>

<script>
    import {actionTypes, routeTypes} from '@/core/constants'
    import AccountTable from './AccountTable'

    export default {
        components: {AccountTable},
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
                this.items = await this.$store.dispatch(actionTypes.ACCOUNT.FIND_ALL_COMPLETE, {general: true})
            },
            clickRow(item) {
                this.$router.push({name: routeTypes.ACCOUNT.EDIT, params: {id: item.id}})
            },
            newItem() {
                this.$router.push({name: routeTypes.ACCOUNT.NEW})
            }
        }
    }
</script>
