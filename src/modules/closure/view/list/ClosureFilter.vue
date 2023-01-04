<template>
    <az-search
        :filter="activeFilters"
        simple-search-placeholder="Informe qualquer campo presente na tabela"
        @advanced-search="advancedSearch"
        @clear="clear"
        @remove-filter="remove"
        @simple-search="simpleSearch()">
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
    </az-search>
</template>

<script>

    export default {
        props: {
            filter: {
                type: Object
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
