<template>
    <page-container manager-view>
        <search-row
            v-model="search"
            :showNew="true"
            :adminNew="true"
            @new="newItem()"/>

        <product-table
            :items="items"
            :search="search"
            :loading="loading"
            @click:row="clickRow"/>
    </page-container>
</template>

<script>
    import {actionTypes, routeTypes} from '@/core/constants'
    import ProductTable from './ProductTable'

    export default {
        components: {ProductTable},
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
                this.items = await this.$store.dispatch(actionTypes.PRODUCT.FIND_ALL_COMPLETE, {general: true})
            },
            clickRow(item) {
                this.$router.push({name: routeTypes.PRODUCT.EDIT, params: {id: item.id}})
            },
            newItem() {
                this.$router.push({name: routeTypes.PRODUCT.NEW})
            }
        }
    }
</script>
