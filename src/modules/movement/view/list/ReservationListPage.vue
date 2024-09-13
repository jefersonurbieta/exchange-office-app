<template>
    <page-container class="operacaoBusca">
        <search-row
            :filter="filter"
            :showNew="!viewUser()"
            :advancedSearch="true"
            @new="newEvent()"
            @advancedSearch="resetTable">
            <movement-filter
                :filter="filter"
                :accounts="accounts"
                :products="products"
                :users="users"
                @clear="cleanFilter"
                @simpleSearch="simpleSearch"
                @advancedSearch="resetTable"/>
        </search-row>

        <movement-table
            :key="resetTableKey"
            :items="items"
            :loading="loading"
            :reservation="true"
            :totalItems="totalItems"
            :search="search"
            @click:row="clickItem"
            @changePage="advancedSearch"
            @view="view"/>
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

export default {
    components: {
        MovementTable,
        MovementFilter
    },
    data() {
        return {
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
            filter: this.$store.state.movement.reservationDefaultFilter
        }
    },
    async mounted() {
        this.filter = this.$store.state.movement.reservationFilter
        await this.findAuxiliaryRecords()
        this.loading = false
    },
    methods: {
        newEvent() {
            this.$router.push({name: routeTypes.RESERVATION.NEW})
        },
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
            this.filter.status.value = statusTypes.RESERVED

            this.$store.commit(mutationTypes.MOVEMENT.SET_FILTER, this.filter)

            const data = await this.$store.dispatch(actionTypes.MOVEMENT.ADVANCED_SEARCH, {
                filter: this.filter,
                pagination: this.$store.state.movement.reservationPagination
            })
            this.totalItems = data.count
            this.items = data.content
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
                name: routeTypes.RESERVATION.EDIT,
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
            this.view(item.id)
        },
        view(id) {
            this.$router.push({name: routeTypes.RESERVATION.EDIT, params: {id}})
        },
        print(item) {
            const form  = document.createElement("form");
            form .target = '_blank'
            form .method = 'POST'
            form .action = 'http://localhost:8081/'
            form.style.display = 'none'

            const movementInput = document.createElement("input");
            movementInput.type = 'hidden'
            movementInput.name = 'movement'
            movementInput.value = item.toJSON()

            form.appendChild(movementInput);

            const companyInput = document.createElement("input");
            companyInput.type = 'hidden'
            companyInput.name = 'company'
            companyInput.value = this.$store.state.loggedCompany.toJSON()

            form.appendChild(companyInput);

            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);

        },
        cleanFilter() {
            this.$store.commit(mutationTypes.MOVEMENT.SET_FILTER, this.$store.state.movement.reservationDefaultFilter)
            this.filter = this.$store.state.movement.reservationFilter
            this.resetTable()
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
