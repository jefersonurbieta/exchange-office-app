<template>
    <page-container manager-view>
        <search-row
            v-model="search"
            :showNew="true"
            :adminNew="true"
            @new="newItem()"/>

        <user-table
            :items="itemsToShow"
            :search="search"
            :loading="loading"
            @click:row="clickRow"/>
    </page-container>
</template>

<script>
import {actionTypes, routeTypes} from '@/core/constants'
import UserTable from './UserTable'
import roleTypes from "@/core/constants/role-types";

export default {
    components: {UserTable},
    data() {
        return {
            search: '',
            loading: true,
            items: []
        }
    },
    computed: {
        itemsToShow() {
            if (this.adminUser()) return this.items
            return this.items.filter(user => user.role !== roleTypes.ADMIN && user.role !== roleTypes.COMPANY)
        }
    },
    async mounted() {
        await this.query()
        this.loading = false
    },
    methods: {
        async query() {
            this.items = await this.$store.dispatch(actionTypes.USER.FIND_ALL)
        },
        clickRow(item) {
            this.$router.push({name: routeTypes.USER.EDIT, params: {id: item.id}})
        },
        newItem() {
            this.$router.push({name: routeTypes.USER.NEW})
        }
    }
}
</script>
