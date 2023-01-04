<template>
    <div class="az-form-content">
        <v-row>
            <v-col cols="12" md="4" sm="6" xs="12">
                <field-label>Nome</field-label>
                <v-text-field
                    :disabled="!editable"
                    :error-messages="errors.first('Nome')"
                    class="required"
                    maxlength="100"
                    name="Nome"
                    placeholder="Ex: Thalita"
                    required
                    v-model="value.name"
                    v-validate="'required'"
                    solo
                    flat
                    shaped/>
            </v-col>
            <v-col cols="12" md="4" sm="6" xs="12">
                <field-label>E-mail</field-label>
                <v-text-field
                    :disabled="!editable"
                    :error-messages="errors.first('Email')"
                    class="required"
                    maxlength="100"
                    name="Email"
                    placeholder="Ex: thalita@email.com"
                    required
                    v-model="value.email"
                    v-validate="'required'"
                    solo
                    flat
                    shaped/>
            </v-col>
            <v-col cols="12" md="4" sm="6" xs="12">
                <field-label>Situação</field-label>
                <v-select
                    :disabled="!editable"
                    :error-messages="errors.first('Situação')"
                    :items="statusTypes.list"
                    item-text="name"
                    item-value="value"
                    name="Situação"
                    placeholder="Ex: Ativo"
                    required
                    v-model="value.status"
                    v-validate="'required'"
                    solo
                    flat
                    shaped/>
            </v-col>
            <v-col cols="12" md="4" sm="6" xs="12">
                <field-label>Papel</field-label>
                <v-select
                    v-model="value.role"
                    :disabled="!editable"
                    :error-messages="errors.first('Papel')"
                    :items="adminUser() ? rolesTypes.adminList : rolesTypes.list"
                    item-text="name"
                    item-value="value"
                    class="required"
                    name="Papel"
                    placeholder="Ex: Operador"
                    required
                    v-validate="'required'"
                    solo
                    flat
                    shaped/>
            </v-col>
            <v-col cols="12" md="4" sm="6" xs="12">
                <field-label>Login</field-label>
                <v-text-field
                    v-if="!value.id && editable"
                    v-model="value.login"
                    :disabled="!editable"
                    :error-messages="errors.first('Login')"
                    class="required"
                    maxlength="25"
                    name="Login"
                    placeholder="Ex: thalita"
                    required
                    v-validate="'required'"
                    solo
                    flat
                    shaped/>
                <field-view
                    v-else
                    :text="value.login"/>
            </v-col>
            <v-col cols="12" md="4" sm="6" xs="12" v-if="!value.id && editable">
                <field-label>Senha</field-label>
                <v-text-field
                    v-model="value.password"
                    :disabled="!editable || value.id"
                    :error-messages="errors.first('Senha')"
                    class="required"
                    counter
                    maxlength="25"
                    name="Senha"
                    placeholder="Ex: Senha123"
                    required
                    type="password"
                    v-validate="'required'"
                    solo
                    flat
                    shaped/>
            </v-col>
            <v-col cols="12" md="6" sm="6" xs="12" v-if="editable && managerUser()">
                <field-label>Empresas</field-label>
                <v-combobox
                    v-model="selectedCompanies"
                    :items="companies"
                    :disabled="!editable"
                    item-text="companyName"
                    item-value="companyId"
                    :error-messages="errors.first('Empresas')"
                    class="required"
                    maxlength="25"
                    name="Empresas"
                    placeholder="Ex: Senha123"
                    v-validate="'required'"
                    multiple
                    solo
                    small-chips
                    flat
                    shaped
                    @change="companiesChanges"/>
            </v-col>
        </v-row>
    </div>
</template>

<script>

import roleTypes from "@/core/constants/role-types";
import {statusTypes} from "@/core/constants";

export default {
    inject: ['$validator'],
    props: {
        value: {
            required: true
        },
        editable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            valid: true,
            selectedCompanies: []
        }
    },
    computed: {
        companies() {
            return this.$store.state.userCompanies.filter(company => company.status === statusTypes.ACTIVATED && company.role !== roleTypes.OPERATOR)
        }
    },
    watch: {
        value() {
            if (this.value && this.value.companies) {
                console.log('fdf')
                this.value.companiesIds = this.value.companies.map(value => value.companyId)
                this.selectedCompanies = this.$store.state.userCompanies.filter(company => this.value.companiesIds.includes(company.companyId))
            }
        },
    },
    methods: {
        companiesChanges() {
            this.value.companiesIds = this.selectedCompanies.map(value => value.companyId)
        }
    }
}
</script>
