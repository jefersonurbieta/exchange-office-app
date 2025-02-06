<template>
    <div>
        <container-card class="mt-5">
            <v-row v-if="value.type === movementTypes.PURCHASE_SALE">
                <v-col cols="12" md="4" class="pt-3">
                    <field-label>Operação</field-label>
                    <br>
                    <v-btn
                        v-if="value.operationType === movementOperationTypes.SALE"
                        depressed
                        class="mr-2 text-capitalize"
                        rounded
                        shaped
                        :color="value.operationType === movementOperationTypes.SALE ? 'primary' : ''"
                        disabled>
                        Venda
                    </v-btn>
                    <v-btn
                        v-if="value.operationType === movementOperationTypes.PURCHASE"
                        depressed
                        class="mr-2"
                        rounded
                        shaped
                        :color="value.operationType === movementOperationTypes.PURCHASE ? 'primary' : ''"
                        disabled>
                        Compra
                    </v-btn>
                </v-col>

                <v-col
                    v-if="value.product"
                    cols="12" md="4" class="pt-3">
                    <field-label>
                        Produto
                    </field-label>
                    <field-view
                        :text="value.product.name"/>
                </v-col>

                <v-col
                    v-if="value.product && value.product.showCost && value.product.type !== productTypes.CURRENCY"
                    cols="12" md="4" class="pt-3">
                    <field-label>
                        Custo do Produto
                    </field-label>
                    <field-view
                        :text="value.productCost"/>
                </v-col>

                <v-col
                    v-if="value.product && value.product.showAmount"
                    cols="12" md="4" class="pt-3">
                    <field-label>
                        Quantidade
                    </field-label>
                    <field-view
                        :text="value.amount | value(value.product.quantityDecimalPlacesAmount)"/>
                </v-col>

                <v-col
                    v-if="value.product"
                    cols="12" md="4" class="pt-3">
                    <field-label>
                        {{ labelProductCost(false) }}
                    </field-label>
                    <field-view
                        :text="value.rate | value(value.product.quantityDecimalPlacesAmount)"/>
                </v-col>

                <v-col
                    v-if="value.account"
                    cols="12" md="4" class="pt-3">
                    <field-label>
                        Forma de Pagamento
                    </field-label>
                    <field-view
                        :text="value.account.name"/>
                </v-col>

                <v-col
                    v-if="value.customer"
                    cols="12" md="4" class="pt-3">
                    <field-label>
                        Cliente
                    </field-label>
                    <field-view
                        :text="value.customer.name"/>
                </v-col>

                <v-col cols="12" md="4"
                       v-if="value.product && value.product.showAmount">
                    <field-label>Valor da Operação</field-label>
                    <field-view
                        :text="value.value | real"/>
                </v-col>

                <v-col cols="12" md="4" v-if="value.product && value.product.showIOF">
                    <field-label>Valor IOF</field-label>
                    <field-view
                        :text="value.iof | real"/>
                </v-col>

                <v-col cols="12" md="4"
                       v-if="value.product && value.product.showIOF && value.product.showAmount">
                    <field-label>Taxa Líquida</field-label>
                    <field-view
                        :text="value.liquidRate | real"/>
                </v-col>

                <v-col cols="12" md="4"
                       v-if="value.product && (value.product.showAmount || value.product.showIOF)">
                    <field-label>Valor Liquído</field-label>
                    <field-view
                        :text="value.liquidValue | real"/>
                </v-col>
            </v-row>

            <v-row v-if="value.type !== movementTypes.PURCHASE_SALE && (value.targetType === movementTargetTypes.ACCOUNT || value.targetType === movementTargetTypes.ACCOUNT_TO_ACCOUNT )">
                <v-col
                    v-if="value.account"
                    cols="12" md="4" class="pt-3">
                    <field-label>
                        Conta
                    </field-label>
                    <field-view
                        :text="value.account.name"/>
                </v-col>

                <v-col cols="12" md="4" class="pt-3">
                    <field-label>
                        Valor
                    </field-label>
                    <field-view
                        :text="value.value"/>
                </v-col>

                <v-col
                    v-if="value.type && value.type === movementTypes.TRANSFER && value.targetType === movementTargetTypes.ACCOUNT_TO_ACCOUNT && value.targetAccount"
                    cols="12" md="4" class="pt-3">
                    <field-label>
                        Destino
                    </field-label>
                    <field-view
                        :text="value.targetAccount.name"/>
                </v-col>

                <v-col
                    v-if="value.type && value.type === movementTypes.TRANSFER && value.targetType === movementTargetTypes.ACCOUNT && value.targetUser"
                    cols="12" md="4">
                    <field-label>
                        Usuário
                    </field-label>
                    <field-view
                        :text="value.targetUser.name"/>
                </v-col>
            </v-row>

            <v-row v-if="value.type !== movementTypes.PURCHASE_SALE && value.targetType === movementTargetTypes.PRODUCT">
                <v-col
                    v-if="value.product"
                    cols="12" md="4" class="pt-3">
                    <field-label>
                        Produto
                    </field-label>
                    <field-view
                        :text="value.product.name"/>
                </v-col>

                <v-col cols="12" md="4" class="pt-3">
                    <field-label>
                        Quantidade
                    </field-label>
                    <field-view
                        :text="value.amount"/>
                </v-col>

                <v-col
                    v-if="value.type && value.type === movementTypes.TRANSFER && value.targetUser"
                    cols="12" md="4" class="pt-3">
                    <field-label>
                        Usuário
                    </field-label>
                    <field-view
                        :text="value.targetUser.name"/>
                </v-col>

                <v-col
                    v-if="value.type && value.type === movementTypes.INPUT"
                    cols="12" md="4">
                    <field-label>
                        Taxa
                    </field-label>
                    <field-view
                        :text="value.rate"/>
                </v-col>
            </v-row>

        </container-card>
    </div>
</template>

<script>

import {movementOperationTypes, productTypes} from "@/core/constants";

export default {
        props: {
            value: {
                required: true
            }
        },
    methods: {
        labelProductCost(iof) {
            if (this.value.product && this.value.product.type === productTypes.CURRENCY) {
                return 'Taxa da Operação' + (iof ? ' com IOF' : '')
            } else {
                return `Preço de ${movementOperationTypes.getName(this.value.operationType)}` + (iof ? ' com IOF' : '')
            }
        }
    }
    }
</script>
