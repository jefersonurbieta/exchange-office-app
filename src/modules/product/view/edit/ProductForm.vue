<template>
    <div>
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
                        placeholder="Ex. Dolar"
                        required
                        v-validate="'required'"
                        solo
                        flat
                        shaped/>
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
                    <field-label>Tipo</field-label>
                    <v-select
                        v-model="value.type"
                        :disabled="!editable"
                        :error-messages="errors.first('Tipo')"
                        :items="currencyTypes.list"
                        item-text="name"
                        item-value="value"
                        name="Tipo"
                        placeholder="Ex. Moeda"
                        required
                        v-validate="'required'"
                        solo
                        flat
                        shaped
                        @change="changedTypeField"/>
                </v-col>

                <v-col cols="12" sm="6">
                    <field-label>Categoria</field-label>
                    <v-combobox
                        v-model="value.category"
                        :disabled="!editable"
                        :items="categories"
                        name="Categoria"
                        placeholder="Ex. Local"
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

        <container-card class="mt-5" title="Configuração">
            <v-row>
                <v-col cols="12" sm="6">
                    <field-label>Apresentar IOF</field-label>
                    <v-select
                        v-model="value.showIOF"
                        :disabled="!editable"
                        :error-messages="errors.first('Apresentar IOF')"
                        :items="booleanTypes.list"
                        item-text="name"
                        item-value="value"
                        name="Apresentar IOF"
                        placeholder="Ex. Sim"
                        required
                        v-validate="'required'"
                        solo
                        flat
                        shaped/>
                </v-col>

                <v-col cols="12" sm="6">
                    <field-label>Apresentar Custo</field-label>
                    <v-select
                        v-model="value.showCost"
                        :disabled="!editable"
                        :error-messages="errors.first('Apresentar Custo')"
                        :items="booleanTypes.list"
                        item-text="name"
                        item-value="value"
                        name="Apresentar Custo"
                        placeholder="Ex. Sim"
                        required
                        v-validate="'required'"
                        solo
                        flat
                        shaped/>
                </v-col>

                <v-col cols="12" sm="6">
                    <field-label>Apresentar Quantidade</field-label>
                    <v-select
                        v-model="value.showAmount"
                        :disabled="!editable"
                        :error-messages="errors.first('Apresentar Quantidade')"
                        :items="booleanTypes.list"
                        item-text="name"
                        item-value="value"
                        name="Apresentar Quantidade"
                        placeholder="Ex. Sim"
                        required
                        v-validate="'required'"
                        solo
                        flat
                        shaped/>
                </v-col>
            </v-row>
        </container-card>

        <container-card class="mt-5" title="Casas Decimais">
            <v-row>
                <v-col cols="12" sm="6">
                    <field-label>Quantidade Casas decimais valor</field-label>
                    <v-text-field
                        v-model="value.quantityDecimalPlacesValue"
                        :disabled="!editable"
                        :error-messages="errors.first('Quantidade Casas decimais valor')"
                        maxlength="100"
                        name="Quantidade Casas decimais valor"
                        type="number"
                        placeholder="Ex. 2"
                        solo
                        flat
                        shaped/>
                </v-col>

                <v-col cols="12" sm="6" v-show="value.showAmount">
                    <field-label>Quantidade Casas decimais quantidade</field-label>
                    <v-text-field
                        v-model="value.quantityDecimalPlacesAmount"
                        :disabled="!editable"
                        :error-messages="errors.first('Quantidade Casas decimais quantidade')"
                        maxlength="100"
                        name="Quantidade Casas decimais quantidade"
                        type="number"
                        placeholder="Ex. 2"
                        solo
                        flat
                        shaped/>
                </v-col>
            </v-row>
        </container-card>

        <container-card class="mt-5" title="Moeda" v-if="value.type === currencyTypes.CURRENCY && !value.id" >
            <v-row>

                <v-col cols="12" sm="6">
                    <field-label>Custo Inicial</field-label>
                    <field-money
                        v-model="value.initialCost"
                        :disabled="!editable"
                        id="custoInicial"
                        :max-length="100"
                        name="Custo Inicial"
                        :precision="value.quantityDecimalPlacesValue"
                        placeholder="Ex. 100"/>
                </v-col>

                <v-col cols="12" sm="6">
                    <field-label>Quantidade Inicial</field-label>
                    <field-money
                        v-model="value.initialAmount"
                        :disabled="!editable"
                        id="quantidadeInicial"
                        :max-length="100"
                        name="Quantidade Inicial"
                        :precision="value.quantityDecimalPlacesAmount"
                        prefix=""
                        placeholder="Ex. 100"/>
                </v-col>
            </v-row>
        </container-card>
    </div>
</template>

<script>
    import {currencyTypes} from '@/core/constants'

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
            categories: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                valid: true
            }
        },
        methods: {
            changedTypeField(value) {
                if (value === currencyTypes.CURRENCY) {
                    this.value.showIOF = true
                    this.value.showCost = true
                    this.value.showAmount = true
                    this.value.quantityDecimalPlacesValue = 2
                    this.value.quantityDecimalPlacesAmount = 2
                }
            }
        }
    }
</script>
