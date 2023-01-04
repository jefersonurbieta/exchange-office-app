<template>
    <page-container>
        <back-button :route="{name: routeTypes.CLOSURE.LIST}"/>

        <v-form
            class="form-content pa-0 form-content-view"
            ref="form"
            v-model="valid">
            <closure-detail v-if="!loading" v-model="closure"/>

            <v-row>
                <v-col cols="6">
                    <closure-financial-items
                        :items="closure.financialItems"
                        :loading="loading"/>
                </v-col>
                <v-col cols="6">
                    <closure-stock-items
                        :items="closure.stockItems"
                        :loading="loading"/>
                </v-col>
            </v-row>

            <closure-movement-table
                class="mt-5 mb-5"
                :items="closureMovements"
                :loading="loading"
                @click:row="clickMovementItem"/>

        </v-form>
    </page-container>
</template>

<script>
    import {actionTypes, closureTypes, routeTypes} from '@/core/constants'
    import ClosureDetail from './ClosureDetail'
    import ClosureFinancialItems from './ClosureFinancialItems'
    import ClosureStockItems from './ClosureStockItems'
    import ClosureMovementTable from './ClosureMovementTable'

    export default {
        components: {
            ClosureStockItems,
            ClosureFinancialItems,
            ClosureDetail,
            ClosureMovementTable
        },
        data() {
            return {
                id: undefined,
                loading: true,
                closure: {},
                closureMovements: [],
                accounts: [],
                products: [],
                valid: true
            }
        },
        async mounted() {
            this.id = this.$route.params.id

            await this.loadRecord()
            this.splitClosureItems()
            await this.loadObjectsInRegistry()
            await this.findAuxiliaryRecords()

            this.loading = false
        },
        methods: {
            async loadRecord() {
                this.closure = await this.$store.dispatch(actionTypes.CLOSURE.FIND_BY_ID, this.id)
                const data = await this.$store.dispatch(actionTypes.CLOSURE.FIND_MOVEMENTS_BY_ID, this.id)
                this.closureMovements = data.content
            },
            async findAuxiliaryRecords() {
                this.accounts = await this.$store.dispatch(actionTypes.ACCOUNT.FIND_ALL)
                this.products = await this.$store.dispatch(actionTypes.PRODUCT.FIND_ALL)
            },
            async loadObjectsInRegistry() {
                if (this.closure.userId) {
                    this.closure.user = await this.$store.dispatch(actionTypes.USER.FIND_BY_ID, this.closure.userId)
                }
            },
            splitClosureItems() {
                this.closure.financialItems = this.closure.itemsView.filter(obj => obj.type === closureTypes.ACCOUNT)
                this.closure.stockItems = this.closure.itemsView.filter(obj => obj.type === closureTypes.PRODUCT)
            },
            clickMovementItem(item) {
                this.$router.push({name: routeTypes.MOVEMENT.EDIT, params: {id: item.id}})
            }
        }
    }
</script>
