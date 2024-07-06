<template>
    <container-card class="mb-5">
        <v-row>
            <v-col cols="12" md="4">
                <field-label>Produto</field-label>
                <v-autocomplete
                    v-if="editable"
                    v-model="value.product"
                    :error-messages="errors.first('Produto')"
                    :items="productsToUse"
                    class="required"
                    item-text="name"
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
                    v-else
                    :text="value.product.name"/>
            </v-col>

            <v-col cols="12" md="4" v-if="value.product && editable">
                <field-label>Quantidade disponível</field-label>
                <field-view
                    :text="value.product.amount"/>
            </v-col>

            <v-col cols="12" md="4">
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
                    v-validate="'required'"/>
                <field-view
                    v-else
                    :text="value.amount"/>
            </v-col>

            <v-col cols="12" md="4" v-if="value.type && value.type === movementTypes.TRANSFER">
                <field-label>Usuário</field-label>
                <v-autocomplete
                    v-if="editable"
                    v-model="value.targetUser"
                    :error-messages="errors.first('Usuário')"
                    :items="targetUsers"
                    class="required"
                    item-text="name"
                    name="Usuário"
                    placeholder="Ex: Sandra"
                    required
                    return-object
                    v-validate="'required'"
                    solo
                    flat
                    shaped
                    @change="targetUserChanged"/>
                <field-view
                    v-else
                    :text="value.targetUser.name"/>
            </v-col>

            <v-col cols="12" md="4" v-if="value.type && value.type === movementTypes.INPUT">
                <field-label>Taxa</field-label>
                <field-money
                    v-if="editable"
                    v-model="value.rate"
                    id="taxaOperacao"
                    class="required"
                    name="Taxa"
                    placeholder="Ex. 100"
                    required
                    :precision="value.product ? value.product.quantityDecimalPlacesValue : 2"
                    v-validate="'required'"/>
                <field-view
                    v-else
                    :text="value.rate"/>
            </v-col>
        </v-row>
    </container-card>
</template>

<script>

import {movementTargetTypes, movementTypes, rolesTypes} from '@/core/constants'

    export default {
        inject: ['$validator'],
        props: {
            value: {
                required: true,
                default: {}
            },
            editable: {
                type: Boolean,
                default: false
            },
            users: {
                type: Array,
                default: () => []
            },
            products: {
                type: Array,
                default: () => []
            },
            productsInternal: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            targetUsers() {
                return this.users.filter(obj => obj.id !== this.$store.state.loki.user.id
                    && obj.role !== rolesTypes.MANAGER
                    && obj.role !== rolesTypes.ADMIN)
            },
            productsToUse() {
                if(
                    this.managerUser()
                    && this.value.type === movementTypes.TRANSFER
                    && this.value.targetType === movementTargetTypes.PRODUCT
                ) {
                    return this.productsInternal
                }
                return this.products
            }
        },
        methods: {
            productChanged() {
                this.value.productId = this.value.product.id
            },
            targetUserChanged() {
                this.value.targetUserId = this.value.targetUser.id
            }
        }
    }
</script>


<style lang="stylus">
</style>
