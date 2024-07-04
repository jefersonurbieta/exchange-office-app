<template>
    <container-card class="mb-5">
        <v-row>
            <v-col cols="12">
                <field-label>Operação</field-label>
                <br>
                <v-btn
                    v-if="!value.id || value.operationType === movementOperationTypes.SALE"
                    depressed
                    class="mr-2 text-capitalize"
                    rounded
                    shaped
                    :color="value.operationType === movementOperationTypes.SALE ? 'primary' : ''"
                    :disabled="value.id != null"
                    @click="operationTypeChanged(movementOperationTypes.SALE)">
                    Venda
                </v-btn>
                <v-btn
                    v-if="!value.id || value.operationType === movementOperationTypes.PURCHASE"
                    depressed
                    class="mr-2"
                    rounded
                    shaped
                    :color="value.operationType === movementOperationTypes.PURCHASE ? 'primary' : ''"
                    :disabled="value.id != null"
                    @click="operationTypeChanged(movementOperationTypes.PURCHASE)">
                    Compra
                </v-btn>
            </v-col>

            <v-col cols="12" md="6">
                <field-label>Produto</field-label>
                <v-select
                    v-if="!value.id"
                    v-model="value.product"
                    :disabled="!editable"
                    :error-messages="errors.first('Produto')"
                    :items="activeProducts"
                    class="required"
                    item-text="name"
                    item-value="id"
                    name="Produto"
                    placeholder="Ex: Dolar"
                    required
                    return-object
                    v-validate="'required'"
                    solo
                    flat
                    shaped
                    @change="productChanged"/>
                <field-view
                    v-if="value.id"
                    :text="value.product.name"/>
            </v-col>

            <v-col
                cols="12" md="3"
                class="pt-3">
                <field-label
                    v-if="value.product && value.product.showCost && value.product.type === productTypes.CURRENCY && editable">
                    Custo
                </field-label>
                <field-view
                    v-if="value.product && value.product.showCost && value.product.type === productTypes.CURRENCY && editable"
                    :text="value.product.cost | real(value.product.quantityDecimalPlacesValue)"/>
            </v-col>

            <v-col
                cols="12" md="3"
                class="pt-3">
                <field-label
                    v-if="value.product && value.product.type === productTypes.CURRENCY && editable">
                    Quantidade disponível
                </field-label>
                <field-view
                    v-if="value.product && value.product.type === productTypes.CURRENCY && editable"
                    :text="value.product.amount | value(value.product.quantityDecimalPlacesAmount)"/>
            </v-col>

            <v-col
                v-if="value.product && value.product.showCost && value.product.type !== productTypes.CURRENCY"
                cols="12" md="4">
                <field-label>Custo do Produto</field-label>
                <field-money
                    v-if="editable"
                    v-model="value.productCost"
                    :disabled="!editable"
                    id="custo"
                    class="required"
                    name="Custo do Produto"
                    placeholder="Ex. 100"
                    required
                    v-validate="'required'"/>
                <field-view
                    v-if="!editable"
                    :text="value.productCost"/>
            </v-col>

            <v-col cols="12" md="4"
                   v-if="value.product && value.product.showAmount">
                <field-label>Quantidade</field-label>
                <field-money
                    v-if="editable"
                    v-model="value.amount"
                    id="quantidade"
                    class="required"
                    name="Quantidade"
                    placeholder="Ex. 100"
                    prefix=""
                    :precision="value.product ? value.product.quantityDecimalPlacesAmount : 0"
                    required
                    v-validate="'required'"
                    @input="calcValues"/>
                <field-view
                    v-if="!editable"
                    :text="value.amount | value(value.product.quantityDecimalPlacesAmount)"/>
            </v-col>

            <v-col cols="12" md="4" class="pt-3"
                   v-if="value.product">
                <field-label>{{ labelProductCost(false) }}</field-label>
                <field-money
                    v-if="editable"
                    v-model="value.rate"
                    :disabled="!editable"
                    id="taxaOperacao"
                    class="required"
                    :name="labelProductCost(false)"
                    placeholder="Ex. 100"
                    required
                    :precision="value.product ? value.product.quantityDecimalPlacesValue : 2"
                    v-validate="'required'"
                    @input="calcValues"/>
                <field-view
                    v-if="!editable"
                    :text="value.rate | value(value.product.quantityDecimalPlacesAmount)"/>
            </v-col>

            <v-col cols="12" md="4"
                   v-if="value.product">
                <field-label>Forma de Pagamento</field-label>
                <v-select
                    v-if="editable"
                    v-model="value.account"
                    :error-messages="errors.first('Forma de Pagamento')"
                    :items="activeAccounts"
                    class="required"
                    item-text="name"
                    name="Forma de Pagamento"
                    placeholder="Ex: Dinheiro"
                    required
                    return-object
                    v-validate="'required'"
                    solo
                    flat
                    shaped
                    @change="accountChanged"/>

                <field-view
                    v-if="!editable && value.account != null"
                    :text="value.account.name"/>
            </v-col>

            <v-col cols="12" md="3"
                   v-if="value.product && value.product.showAmount">
                <field-label>Valor da Operação</field-label>
                <field-view
                    :text="value.value | real"/>
            </v-col>

            <v-col cols="12" md="3" v-if="value.product && value.product.showIOF">
                <field-label>Valor IOF</field-label>
                <field-view
                    :text="value.iof | real"/>
            </v-col>

            <v-col cols="12" md="3"
                   v-if="value.product && value.product.showIOF && value.product.showAmount">
                <field-label>Taxa Líquida</field-label>
                <field-view
                    :text="value.liquidRate | real"/>
            </v-col>

            <v-col cols="12" md="3"
                   v-if="value.product && (value.product.showAmount || value.product.showIOF)">
                <field-label>Valor Liquído</field-label>
                <field-view
                    :text="value.liquidValue | real"/>
            </v-col>
        </v-row>
    </container-card>
</template>

<script>

    import {NumberUtils} from '@/core/utils'
    import {movementOperationTypes, productTypes} from '@/core/constants'
    import StatusTypes from '@/core/constants/status-types'

    export default {
        props: {
            value: {
                required: true,
                default: {}
            },
            editable: {
                type: Boolean,
                default: false
            },
            accounts: {
                type: Array,
                default: () => []
            },
            products: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            activeProducts() {
                return this.products.filter(obj => obj.status === StatusTypes.ACTIVATED)
            },
            activeAccounts() {
                return this.accounts.filter(obj => obj.status === StatusTypes.ACTIVATED)
            }
        },
        methods: {
            calcValues() {
                if (this.value.operationType === movementOperationTypes.SALE) {
                    this.value.iofRate = this.$store.state.loggedCompany.iofConfig.saleIOF
                } else if (this.value.operationType === movementOperationTypes.PURCHASE) {
                    this.value.iofRate = this.$store.state.loggedCompany.iofConfig.purchaseIOF
                }

                if (this.value.product.showAmount) {
                    this.value.value = NumberUtils.roundValue(this.value.rate * this.value.amount)
                } else {
                    this.value.value = NumberUtils.roundValue(this.value.rate)
                }

                this.value.liquidValue = this.value.value

                if (this.value.product.showIOF) {
                    this.value.iof = NumberUtils.roundValue(this.value.liquidValue * (this.value.iofRate / 100))

                    if (this.value.operationType === movementOperationTypes.SALE) {
                        this.value.liquidValue += this.value.iof
                    } else if (this.value.operationType === movementOperationTypes.PURCHASE) {
                        this.value.liquidValue -= this.value.iof
                    }
                }

                if (this.value.product.showAmount) {
                    this.value.liquidRate = NumberUtils.roundValue(this.value.liquidValue / this.value.amount, this.value.product ? this.value.product.quantityDecimalPlacesValue : 2)
                }

                if (this.value.product.showCost && this.value.product.type === productTypes.CURRENCY) {
                    this.value.productCost = this.value.product.cost
                }

                this.$emit('changedValues', this.value)
            },
            operationTypeChanged(value) {
                this.value.operationType = value
                if (this.value.amount && this.value.rate) {
                    this.calcValues()
                }
            },
            productChanged(value) {
                this.value.productId = value.id
                this.value.iof = undefined
                this.value.iofRate = undefined
                this.value.amount = undefined
                this.value.rate = undefined
                this.value.liquidRate = undefined
                this.value.profit = undefined
                this.value.fee = undefined
                this.value.value = undefined
                this.value.liquidValue = undefined
                this.value.productCost = undefined
            },
            accountChanged(value) {
                this.value.accountId = value.id
            },
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

<style lang="stylus" scoped>

.v-text-field__prefix
    font-size 14px
</style>
