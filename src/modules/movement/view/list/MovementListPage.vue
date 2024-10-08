<template>
    <page-container class="operacaoBusca">
        <movement-toolbar
            :filter="filter"
            :types="types"
            @advancedSearch="searchForToolbar">
            <movement-filter
                v-if="!loading"
                :filter="filter"
                :accounts="accounts"
                :products="products"
                :users="users"
                @clear="cleanFilter"
                @simpleSearch="simpleSearch"
                @advancedSearch="resetTable"/>
        </movement-toolbar>

        <movement-table
            :key="resetTableKey"
            :items="items"
            :loading="loading"
            :totalItems="totalItems"
            :search="search"
            @click:row="clickItem"
            @changePage="advancedSearch"
            @view="view"/>

        <movement-detail
            :show="showItemDetail"
            :item="itemDetail"
            @close="showItemDetail = false"
            @view="view"
            @edit="edit"
            @remove="remove"
            @print="print"/>
    </page-container>
</template>

<script>

import {
    actionTypes,
    movementOperationTypes,
    movementTargetTypes,
    movementTypes,
    mutationTypes,
    routeTypes, statusTypes
} from '@/core/constants'
import MovementTable from './MovementTable'
import MovementFilter from './MovementFilter'
import MovementToolbar from './MovementToolbar'
import MovementDetail from './MovementDetail'

    export default {
        components: {
            MovementTable,
            MovementFilter,
            MovementDetail,
            MovementToolbar
        },
        data() {
            return {
                types: [],
                users: [],
                products: [],
                accounts: [],
                search: '',
                loading: true,
                totalItems: 0,
                resetTableKey: 0,
                items: [],
                itemDetail: {},
                showItemDetail: false,
                filter: this.$store.state.movement.defaultFilter
            }
        },
        async mounted() {
            await this.findAuxiliaryRecords()
            this.loading = false
        },
        methods: {
            async findAuxiliaryRecords() {
                const promises = []

                promises.push(this.$store.dispatch(actionTypes.USER.FIND_ALL))
                promises.push(this.$store.dispatch(actionTypes.PRODUCT.FIND_ALL))
                promises.push(this.$store.dispatch(actionTypes.ACCOUNT.FIND_ALL))

                await Promise.all(promises)
                    .then((responses) => {
                        this.users = responses[0]
                        this.products = responses[1]
                        this.accounts = responses[2]
                    })
                    .catch((error) => {
                        console.error('Erro ao fazer requisições:', error);
                    });
            },
            async advancedSearch() {
                if (!this.managerUserView()) {
                    this.filter.userId.value = this.$store.state.loki.user.id
                }
                this.filter.notStatus.value = statusTypes.RESERVED

                this.$store.commit(mutationTypes.MOVEMENT.SET_FILTER, this.filter)

                const data = await this.$store.dispatch(actionTypes.MOVEMENT.ADVANCED_SEARCH, {
                    filter: this.filter,
                    pagination: this.$store.state.movement.pagination
                })

                this.totalItems = data.count
                this.items = data.content
            },
            searchForToolbar(typesLocal) {
                this.types = typesLocal
                this.filter.types.value = typesLocal
                this.resetTable()
            },
            resetTable() {
                this.resetTableKey += 1
            },
            simpleSearch(valor) {
                this.search = valor
            },
            async edit() {
                if (this.itemDetail.type === movementTypes.INPUT && this.itemDetail.targetType === movementTargetTypes.PRODUCT) {
                    const lastProductInputId = await this.$store.dispatch(actionTypes.MOVEMENT.FIND_LAST_PRODUCT_INPUT_ID, this.itemDetail.productId)

                    if (lastProductInputId !== this.itemDetail.id) {
                        this.showErrorNotification('Não é possível editar esta entrada do produto, pois já foi realizado uma nova movimentação para este produto!')
                        return
                    }
                }

                await this.$router.push({
                    name: routeTypes.MOVEMENT.EDIT,
                    params: {id: this.itemDetail.id}
                })
            },
            async remove() {
                if ((this.itemDetail.targetType === movementTargetTypes.PRODUCT && this.itemDetail.type === movementTypes.INPUT) || (this.itemDetail.type === movementTypes.PURCHASE_SALE && this.itemDetail.operationType === movementOperationTypes.PURCHASE)) {
                    const lastProductInputId = await this.$store.dispatch(actionTypes.MOVEMENT.FIND_LAST_PRODUCT_INPUT_ID, this.itemDetail.productId)

                    if (lastProductInputId !== this.itemDetail.id) {
                        this.showErrorNotification('Não é possível excluir esta entrada do produto, pois já foi realizado uma nova movimentação para este produto!')
                        return
                    }
                }

                await this.$store.dispatch(actionTypes.MOVEMENT.REMOVE, this.itemDetail.id)
                await this.advancedSearch()
                this.showItemDetail = false
                this.showSuccessNotification()
            },
            clickItem(item) {
                this.itemDetail = item
                this.showItemDetail = true
            },
            view(id) {
                this.$router.push({name: routeTypes.MOVEMENT.EDIT, params: {id}, query:{view: true}})
            },
            async print() {
                const movement = this.itemDetail
                if (movement.customerId) {
                    movement.customer = await this.$store.dispatch(actionTypes.CUSTOMER.FIND_BY_ID, movement.customerId)
                }
                if (movement.productId) {
                    movement.product = await this.$store.dispatch(actionTypes.PRODUCT.FIND_BY_ID, movement.productId)
                }
                if (movement.accountId) {
                    movement.account = await this.$store.dispatch(actionTypes.ACCOUNT.FIND_BY_ID, movement.accountId)
                }

                await this.$store.dispatch(actionTypes.MOVEMENT.PRINT, {
                    movement,
                    company: this.$store.state.loggedCompany
                })
            },
            cleanFilter() {
                this.$store.commit(mutationTypes.MOVEMENT.SET_FILTER, this.$store.state.movement.defaultFilter)
                this.filter = this.$store.state.movement.filter
                this.resetTable()
                this.types = []
            }
        }
    }
</script>

<style lang="stylus">
.operacaoBusca
    .az-toolbar
        .search
            top 10px !important
            width auto !important

    .totalizador-ativado:before
        opacity 0.24 !important
</style>
