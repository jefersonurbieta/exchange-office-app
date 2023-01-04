<template>
    <page-container manager-view>
        <search-row
            v-model="search"
            :showNew="true"
            :adminNew="true"
            @new="newItem()"/>

        <company-table
            :items="items"
            :search="search"
            :loading="loading"
            @click:row="clickRow"/>
    </page-container>
</template>

<script>
import {actionTypes, routeTypes} from '@/core/constants'
import CompanyTable from './CompanyTable'

export default {
    components: {CompanyTable},
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
            this.items = await this.$store.dispatch(actionTypes.COMPANY.FIND_ALL)
        },
        clickRow(item) {
            this.$router.push({name: routeTypes.COMPANY.EDIT, params: {id: item.id}})
        },
        newItem() {
            this.$router.push({name: routeTypes.COMPANY.NEW})
        }
    }
}
</script>
