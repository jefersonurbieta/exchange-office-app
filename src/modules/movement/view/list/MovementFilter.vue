<template>
    <search
        :filter="activeFilters"
        simple-search-placeholder="Informe qualquer campo presente na tabela"
        show-advanced-search
        hide-simple-search
        @advanced-search="advancedSearch"
        @clear="clear"
        @remove-filter="remove"
        @simple-search="simpleSearch()">
        <az-search-item slot="search-items">
            <field-label>Produto</field-label>
            <v-select
                :items="products"
                item-text="name"
                item-value="id"
                name="Produto"
                clearable
                placeholder="Produto"
                v-model="filter.productId.value"
                solo
                flat
                shaped/>
        </az-search-item>

        <az-search-item slot="search-items">
            <field-label>Cliente</field-label>
            <v-text-field
                v-model="filter.customerName.value"
                maxlength="100"
                name="Nome"
                solo
                flat
                shaped/>
        </az-search-item>

        <az-search-item slot="search-items">
            <field-label>Tipo de movimentação</field-label>
            <v-select
                :items="movementTypes.list"
                item-text="name"
                item-value="value"
                name="Tipo de movimentação"
                clearable
                placeholder="Tipo de movimentação"
                v-model="filter.type.value"
                solo
                flat
                shaped/>
        </az-search-item>

        <az-search-item slot="search-items">
            <field-label>Movimentação de</field-label>
            <v-select
                :items="movementTargetTypes.list"
                item-text="name"
                item-value="value"
                name="Movimentação de"
                clearable
                placeholder="Movimentação de"
                v-model="filter.targetType.value"
                solo
                flat
                shaped/>
        </az-search-item>

        <az-search-item slot="search-items">
            <field-label>Operação de</field-label>
            <v-select
                :items="movementOperationTypes.list"
                item-text="name"
                item-value="value"
                name="Operação de"
                clearable
                placeholder="Operação de"
                v-model="filter.operationType.value"
                solo
                flat
                shaped/>
        </az-search-item>

        <az-search-item slot="search-items">
            <field-label>Conta</field-label>
            <v-select
                :items="accounts"
                item-text="name"
                item-value="id"
                name="Conta"
                clearable
                placeholder="Conta"
                v-model="filter.accountId.value"
                solo
                flat
                shaped/>
        </az-search-item>

        <az-search-item slot="search-items" v-if="managerUser">
            <field-label>Usuário</field-label>
            <v-select
                :items="users"
                item-text="name"
                item-value="id"
                name="Usuário"
                clearable
                placeholder="Usuário"
                v-model="filter.userId.value"
                solo
                flat
                shaped/>
        </az-search-item>

        <az-search-item slot="search-items">
            <field-label>Data Inicio</field-label>
            <field-date
                name-date="dataInicio"
                v-model="filter.startDate.value"/>
        </az-search-item>

        <az-search-item slot="search-items">
            <field-label>Data Fim</field-label>
            <field-date
                name-date="dataFim"
                v-model="filter.endDate.value"/>
        </az-search-item>
    </search>
</template>

<script>

    export default {
        props: {
            filter: {
                type: Object
            },
            accounts: {
                type: Array,
                default: () => []
            },
            products: {
                type: Array,
                default: () => []
            },
            users: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            activeFilters() {
                const activeFilters = {}
                if (this.filter) {
                    for (let [key, val] of Object.entries(this.filter)) {
                        if (this.filter[key] && this.filter[key].value) {
                            activeFilters[key] = val
                        }
                    }
                }
                return activeFilters
            }
        },
        methods: {
            async simpleSearch(valor) {
                this.$emit('simpleSearch', valor)
            },
            remove(field) {
                this.filter[field].value = this.filter[field].default

                this.$emit('advancedSearch')
            },
            clear() {
                for (let [key] of Object.entries(this.filter)) {
                    this.filter[key].value = this.filter[key].default
                }

                this.$emit('clear')
            },
            advancedSearch() {
                this.$emit('advancedSearch')
            }
        }
    }
</script>
