<template>
    <div>
        <container-card class="mt-5">
            <div class="az-form-content">
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

                    <v-col cols="12" sm="6">
                        <field-label>CNPJ</field-label>
                        <v-text-field
                            v-model="value.receiptConfig.cnpj"
                            :disabled="!editable"
                            :error-messages="errors.first('cnpj')"
                            maxlength="100"
                            name="cnpj"
                            required
                            solo
                            flat
                            shaped
                            v-validate="'required'"/>
                    </v-col>

                    <v-col cols="12" sm="6" v-if="value.id">
                        <field-label>Situação</field-label>
                        <v-select
                            v-if="adminUser()"
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
                        <field-view v-else :text="statusTypes.getName(value.status)"/>
                    </v-col>
                </v-row>
            </div>
        </container-card>

        <container-card class="mt-5" title="Usuario" v-if="adminUser() && !value.id">
            <div class="az-form-content">
                <v-row>
                    <v-col cols="12" sm="6">
                        <field-label>Nome</field-label>
                        <v-text-field
                            v-model="value.userName"
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

                    <v-col cols="12" sm="6">
                        <field-label>Login</field-label>
                        <v-text-field
                            v-model="value.userLogin"
                            :disabled="!editable"
                            :error-messages="errors.first('Login')"
                            maxlength="25"
                            name="Login"
                            placeholder="Ex. Dinheiro"
                            required
                            solo
                            flat
                            shaped
                            v-validate="'required'"/>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <field-label>E-mail</field-label>
                        <v-text-field
                            v-model="value.userEmail"
                            :disabled="!editable"
                            :error-messages="errors.first('E-mail')"
                            maxlength="100"
                            name="E-mail"
                            placeholder="Ex. Dinheiro"
                            required
                            solo
                            flat
                            shaped
                            v-validate="'required'"/>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <field-label>Senha Temporaria</field-label>
                        <v-text-field
                            v-model="value.userPassword"
                            :disabled="!editable"
                            :error-messages="errors.first('Senha Temporaria')"
                            maxlength="25"
                            name="Senha Temporaria"
                            placeholder="Ex. 123"
                            required
                            solo
                            flat
                            shaped
                            v-validate="'required'"/>
                    </v-col>
                </v-row>
            </div>
        </container-card>

        <container-card title="IOF" class="mt-5">
            <div class="az-form-content">
                <v-row>
                    <v-col cols="12" sm="6">
                        <field-label>IOF Compra</field-label>
                        <field-money
                            v-model="value.iofConfig.purchaseIOF"
                            :disabled="!editable"
                            id="purchaseIOF"
                            :max-length="100"
                            name="IOF Compra"
                            prefix=""
                            placeholder="Ex. 4.3"/>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <field-label>IOF Venda</field-label>
                        <field-money
                            v-model="value.iofConfig.saleIOF"
                            :disabled="!editable"
                            id="saleIOF"
                            :max-length="100"
                            name="IOF Venda"
                            prefix=""
                            placeholder="Ex. 4.3"/>
                    </v-col>
                </v-row>
            </div>
        </container-card>

        <container-card title="Boleto" class="mt-5">
            <div class="az-form-content">
                <v-row>
                    <v-col cols="12">
                        <field-label>Descrição Empresa</field-label>
                        <v-text-field
                            v-model="value.receiptConfig.description"
                            :disabled="!editable"
                            :error-messages="errors.first('description')"
                            maxlength="255"
                            name="description"
                            placeholder="Ex. Dinheiro"
                            required
                            solo
                            flat
                            shaped
                            v-validate="'required'"/>
                    </v-col>
                    <v-col cols="12">
                        <field-label>Primeira Descrição</field-label>
                        <v-text-field
                            v-model="value.receiptConfig.firstDescription"
                            :disabled="!editable"
                            :error-messages="errors.first('firstDescription')"
                            maxlength="255"
                            name="firstDescription"
                            placeholder="Ex. Dinheiro"
                            required
                            solo
                            flat
                            shaped
                            v-validate="'required'"/>
                    </v-col>
                    <v-col cols="12">
                        <field-label>Segunda Descrição</field-label>
                        <v-text-field
                            v-model="value.receiptConfig.secondDescription"
                            :disabled="!editable"
                            :error-messages="errors.first('secondDescription')"
                            maxlength="255"
                            name="secondDescription"
                            placeholder="Ex. Dinheiro"
                            required
                            solo
                            flat
                            shaped
                            v-validate="'required'"/>
                    </v-col>
                    <v-col cols="12">
                        <field-label>Terceira Descrição</field-label>
                        <v-text-field
                            v-model="value.receiptConfig.thirdDescription"
                            :disabled="!editable"
                            :error-messages="errors.first('thirdDescription')"
                            maxlength="255"
                            name="thirdDescription"
                            placeholder="Ex. Dinheiro"
                            required
                            solo
                            flat
                            shaped
                            v-validate="'required'"/>
                    </v-col>
                    <v-col cols="12">
                        <field-label>Quarta Descrição</field-label>
                        <v-text-field
                            v-model="value.receiptConfig.fourthDescription"
                            :disabled="!editable"
                            :error-messages="errors.first('fourthDescription')"
                            maxlength="255"
                            name="fourthDescription"
                            placeholder="Ex. Dinheiro"
                            required
                            solo
                            flat
                            shaped
                            v-validate="'required'"/>
                    </v-col>
                </v-row>
            </div>
        </container-card>

        <container-card title="Tela de Parcelamento" class="mt-5">
            <div class="az-form-content">
                <v-row>
                    <v-col cols="12" sm="6">
                        <field-label>Habilitar tela de cálculo de parcelamento</field-label>
                        <v-select
                            v-model="value.installmentConfig.enabled"
                            :disabled="!editable"
                            :error-messages="errors.first('Habilitar tela de cálculo de parcelamento')"
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
                    <v-col cols="12" sm="6" v-show="value.installmentConfig.enabled">
                        <field-label>Taxa de parcelamento (%)</field-label>
                        <field-money
                            v-model="value.installmentConfig.rate"
                            :disabled="!editable"
                            id="installmentConfigRate"
                            :max-length="100"
                            name="Taxa de parcelamento"
                            prefix=""
                            placeholder="Ex. 4.3"/>
                    </v-col>
                </v-row>
            </div>
        </container-card>
    </div>
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
