<template>
    <page-container class="clienteBusca">
        <search-row
            v-model="search"
            :showNew="!viewUser()"
            :adminNew="!viewUser()"
            :advancedSearch="true"
            @new="newEvent()">
            <template v-slot:buttons>
                <v-btn
                    v-if="!viewUser()"
                    depressed
                    color="secondary"
                    class="ml-4"
                    @click="csv">
                    Exportar
                </v-btn>
            </template>

            <customer-filter
                :filter="filter"
                @clear="cleanFilter"
                @simpleSearch="simpleSearch"
                @advancedSearch="resetTable"/>
        </search-row>

        <customer-table
            :key="resetTableKey"
            :items="items"
            :totalItems="totalItems"
            :search="search"
            :loading="loading"
            @changePage="advancedSearch"
            @click:row="clickRow"/>


    </page-container>
</template>

<script>
    import {actionTypes, mutationTypes, routeTypes} from '@/core/constants'
    import CustomerTable from './CustomerTable'
    import CustomerFilter from './CustomerFilter'

    export default {
        components: {CustomerFilter, CustomerTable},
        data() {
            return {
                search: '',
                items: [],
                loading: true,
                totalItems: 0,
                resetTableKey: 0,
                filter: this.$store.state.customer.defaultFilter
            }
        },
        async mounted() {
            this.filter = this.$store.state.customer.filter
        },
        methods: {
            async advancedSearch() {
                this.$store.commit(mutationTypes.CUSTOMER.SET_FILTER, this.filter)

                const data = await this.$store.dispatch(actionTypes.CUSTOMER.ADVANCED_SEARCH, {
                    filter: this.filter,
                    pagination: this.$store.state.customer.pagination
                })
                this.totalItems = data.count
                this.items = data.content
                this.loading = false
            },
            resetTable() {
                this.resetTableKey += 1
            },
            clickRow(item) {
                this.$router.push({name: routeTypes.CUSTOMER.EDIT, params: {id: item.id}})
            },
            newEvent() {
                this.$router.push({name: routeTypes.CUSTOMER.NEW})
            },
            simpleSearch(valor) {
                this.search = valor
            },
            cleanFilter() {
                this.$store.commit(mutationTypes.CUSTOMER.SET_FILTER, this.$store.state.customer.defaultFilter)
                this.filter = this.$store.state.customer.filter
                this.resetTable()
            },
            async csv() {
                await this.$store.dispatch(actionTypes.CUSTOMER.EXPORT_CSV)
            }
        }
    }
</script>

<style lang="stylus">
.clienteBusca
    .az-toolbar
        .search
            top 10px !important
            width auto !important
</style>
