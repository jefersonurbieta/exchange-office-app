<template>
    <container-card class="mt-5 mb-5">
        <v-row>
            <v-col cols="6">
                <field-label>Tipo de movimentação</field-label>
                <br>
                <v-btn
                    v-if="!value.id || value.type === movementTypes.PURCHASE_SALE"
                    depressed
                    class="mr-2 text-capitalize"
                    rounded
                    shaped
                    :disabled="value.id != null"
                    :color="value.type === movementTypes.PURCHASE_SALE ? 'primary' : ''"
                    @click="changeMovementType(movementTypes.PURCHASE_SALE)">
                    Compra/Venda
                </v-btn>
                <v-btn
                    v-if="!value.id || value.type === movementTypes.TRANSFER"
                    depressed
                    class="mr-2"
                    rounded
                    shaped
                    :disabled="value.id != null"
                    :color="value.type === movementTypes.TRANSFER ? 'primary' : ''"
                    @click="changeMovementType(movementTypes.TRANSFER)">
                    Transferência
                </v-btn>
                <v-btn
                    v-if="managerUser() && (!value.id || value.type === movementTypes.INPUT)"
                    depressed
                    class="mr-2"
                    rounded
                    shaped
                    :disabled="value.id != null"
                    :color="value.type === movementTypes.INPUT ? 'primary' : ''"
                    @click="changeMovementType(movementTypes.INPUT)">
                    Entrada
                </v-btn>
                <v-btn
                    v-if="managerUser() && (!value.id || value.type === movementTypes.OUTPUT)"
                    depressed
                    class="mr-2"
                    rounded
                    shaped
                    :disabled="value.id != null"
                    :color="value.type === movementTypes.OUTPUT ? 'primary' : ''"
                    @click="changeMovementType(movementTypes.OUTPUT)">
                    Saida
                </v-btn>
            </v-col>
            <v-col cols="6"
                   v-if="value.type && value.type !== movementTypes.PURCHASE_SALE && value.type !== movementTypes.CLOSURE">
                <field-label>Movimentação de</field-label>
                <br>
                <v-btn
                    v-if="!value.id || value.targetType === movementTargetTypes.PRODUCT"
                    depressed
                    class="mr-2"
                    rounded
                    shaped
                    :disabled="value.id != null"
                    :color="value.targetType === movementTargetTypes.PRODUCT ? 'primary' : ''"
                    @click="changeMovementTargetType(movementTargetTypes.PRODUCT)">
                    Produto
                </v-btn>
                <v-btn
                    v-if="!value.id || value.targetType === movementTargetTypes.ACCOUNT"
                    depressed
                    class="mr-2"
                    rounded
                    shaped
                    :disabled="value.id != null"
                    :color="value.targetType === movementTargetTypes.ACCOUNT ? 'primary' : ''"
                    @click="changeMovementTargetType(movementTargetTypes.ACCOUNT)">
                    Conta
                </v-btn>
            </v-col>
        </v-row>
    </container-card>
</template>

<script>

    import {movementTargetTypes, movementTypes} from '@/core/constants'

    export default {
        props: {
            value: {
                required: true,
                default: {}
            }
        },
        methods: {
            changedType() {
                this.$emit('changedType', this.value)
            },
            changeMovementType(value) {
                this.value.type = value
                this.value.targetType = undefined
                this.value.operationType = undefined
                if (this.value.type.indexOf([movementTypes.TRANSFER, movementTypes.INPUT, movementTypes.OUTPUT]) && !this.value.targetType) {
                    this.value.targetType = movementTargetTypes.PRODUCT
                }
                this.changedType()
            },
            changeMovementTargetType(value) {
                this.value.targetType = value
                this.value.operationType = undefined
                this.changedType()
            }
        }
    }
</script>

<style lang="stylus">
</style>
