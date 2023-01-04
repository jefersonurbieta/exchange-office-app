<template>
    <az-search
        :filter="filter"
        simple-search-placeholder="Informe qualquer campo presente na tabela"
        @advanced-search="advancedSearch()"
        @clear="clear"
        @remove-filter="remove"
        @simple-search="simpleSearch()">

        <az-search-item slot="search-items">
            <field-label>Nome</field-label>
            <v-text-field
                v-model="filter.name.value"
                maxlength="100"
                name="Nome"
                solo
                flat
                shaped/>
        </az-search-item>

        <az-search-item slot="search-items">
            <field-label>E-mail</field-label>
            <v-text-field
                v-model="filter.email.value"
                maxlength="100"
                name="Email"
                solo
                flat
                shaped/>
        </az-search-item>

        <az-search-item slot="search-items">
            <field-label>Tipo Pessoa</field-label>
            <v-select
                v-model="filter.kindPerson.value"
                :items="kindPersons"
                class="required"
                name="TipoPessoa"
                solo
                flat
                shaped/>
        </az-search-item>

        <az-search-item slot="search-items">
            <field-label>CPF/CNPJ</field-label>
            <v-text-field
                v-model="filter.cpfCnpj.value"
                maxlength="100"
                name="cpfCnpj"
                solo
                flat
                shaped/>
        </az-search-item>

        <az-search-item slot="search-items">
            <field-label>País</field-label>
            <v-select
                v-model="filter.country.value"
                :items="paises"
                item-text="nome_pais"
                item-value="nome_pais"
                name="País"
                solo
                flat
                shaped/>
        </az-search-item>

        <az-search-item slot="search-items">
            <field-label>Estado</field-label>
            <v-select
                v-model="filter.state.value"
                :items="estados"
                item-text="nome"
                item-value="nome"
                name="Estado"
                solo
                flat
                shaped/>
        </az-search-item>

        <az-search-item slot="search-items">
            <field-label>Cidade</field-label>
            <v-text-field
                v-model="filter.city.value"
                maxlength="100"
                name="cidade"
                solo
                flat
                shaped/>
        </az-search-item>

        <az-search-item slot="search-items">
            <field-label>Mês de aniversário</field-label>
            <v-select
                v-model="filter.birthdayMonth.value"
                :items="meses"
                item-text="nome"
                item-value="valor"
                name="MesdeAniversario"
                solo
                flat
                shaped/>
        </az-search-item>

        <az-search-item slot="search-items">
            <field-label>Situação</field-label>
            <v-select
                :items="statusTypes.list"
                item-text="name"
                item-value="value"
                name="Situação"
                placeholder="Ex: Ativo"
                v-model="filter.status.value"
                solo
                flat
                shaped/>
        </az-search-item>
    </az-search>
</template>

<script>

    export default {
        props: {
            filter: {
                type: Object
            },
            search: {
                type: String
            }
        },
        data() {
            return {
                kindPersons: ['Física', 'Jurídica', 'Estrangeira'],
                paginationDefault: {}
            }
        },
        methods: {
            async simpleSearch(valor) {
                this.$emit('simpleSearch', valor)
            },
            remove(field) {
                this.filter[field].value = this.filter[field].default
                this.$emit('advancedSearch', this.paginationDefault)
            },
            clear() {
                for (let [key] of Object.entries(this.filter)) {
                    this.filter[key].value = this.filter[key].default
                }
                this.$emit('clear')
            },
            advancedSearch() {
                if (this.filter?.birthdayMonth?.value !== this.filter?.birthdayMonth?.default) {
                    this.filter.birthdayMonth.value = this.filter.birthdayMonth.value + 1
                }
                this.$emit('advancedSearch', this.paginationDefault)
            }
        }
    }
</script>

<style lang="stylus">

</style>
