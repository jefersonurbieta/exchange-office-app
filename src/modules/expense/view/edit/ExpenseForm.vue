<template>
    <container-card class="mt-5">
        <v-row>
            <v-col cols="12" sm="6">
                <field-label>Nome</field-label>
                <v-text-field
                    v-model="value.name"
                    :disabled="!editable"
                    :error-messages="errors.first('Nome')"
                    maxlength="100"
                    name="Nome"
                    placeholder="Ex. Conta de Luz"
                    required
                    solo
                    flat
                    shaped
                    v-validate="'required'"/>
            </v-col>

            <v-col cols="12" sm="6">
                <field-label>Valor</field-label>
                <field-money
                    v-model="value.amount"
                    :disabled="!editable"
                    :error-messages="errors.first('Valor')"
                    id="valor"
                    :max-length="100"
                    name="Valor"
                    placeholder="Ex. 100"
                    required
                    v-validate="'required'"/>
            </v-col>

            <v-col cols="12" sm="3">
                <field-label>Data</field-label>
                <field-date
                    isRequired
                    name-date="Data"
                    v-model="value.dateForm"/>
            </v-col>

            <v-col cols="12" md="3">
                <field-label>Conta</field-label>
                <v-autocomplete
                    v-model="value.accountId"
                    :disabled="!editable || value.id"
                    :items="accounts"
                    item-text="name"
                    item-value="id"
                    name="Conta"
                    placeholder="Ex: Dinheiro"
                    solo
                    flat
                    shaped/>
            </v-col>

            <v-col cols="12" sm="9">
                <field-label>Descrição</field-label>
                <v-text-field
                    v-model="value.description"
                    :disabled="!editable"
                    maxlength="100"
                    name="Descrição"
                    placeholder="Ex. Conta de luz do escritorio"
                    solo
                    flat
                    shaped/>
            </v-col>
        </v-row>
    </container-card>
</template>

<script>
    export default {
        inject: ['$validator'],
        props: {
            value: {
                required: true
            },
            editable: {
                type: Boolean,
                default: false
            },
            accounts: {
                type: Array,
                default: () => []
            }
        }
    }
</script>
