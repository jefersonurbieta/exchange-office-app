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
                    placeholder="Ex. Dinheiro"
                    required
                    solo
                    flat
                    shaped
                    v-validate="'required'"/>
            </v-col>

            <v-col cols="12" sm="6" v-if="!value.id">
                <field-label>Valor Inicial</field-label>
                <field-money
                    v-model="value.openingBalance"
                    :disabled="!editable"
                    id="valorInicial"
                    :max-length="100"
                    name="Valor Inicial"
                    placeholder="Ex. 100"/>
            </v-col>

            <v-col cols="12" sm="6" v-if="value.id">
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

            <v-col cols="12" sm="6">
                <field-label>Ordem</field-label>
                <v-text-field
                    v-model="value.order"
                    :disabled="!editable"
                    maxlength="100"
                    name="Ordem"
                    type="number"
                    placeholder="Ex. Ordem"
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
            }
        }
    }
</script>
