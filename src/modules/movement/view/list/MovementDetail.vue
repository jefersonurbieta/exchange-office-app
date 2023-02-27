<template>
    <v-dialog
        v-model="showDialog"
        max-width="40%">
        <v-card>
            <v-card-text>
                <div class="az-form-content">
                    <v-row>
                        <v-col cols="12" md="3" class="pt-3">
                            <field-label>Código</field-label>
                            <field-view :text="item.code"/>
                        </v-col>
                        <v-col cols="12" md="3" class="pt-3">
                            <field-label>Data</field-label>
                            <field-view :text="item.createdAt | datetime"/>
                        </v-col>
                        <v-col cols="12" md="3" class="pt-3">
                            <field-label>Operação</field-label>
                            <field-view :text="typeName(item)"/>
                        </v-col>
                        <v-col cols="12" md="3" class="pt-3">
                            <field-label>Usuário</field-label>
                            <field-view :text="item.userName"/>
                        </v-col>
                        <v-col cols="12" md="3" class="pt-3">
                            <field-label>Destino</field-label>
                            <field-view :text="targetName(item)"/>
                        </v-col>
                        <v-col cols="12" md="3" class="pt-3">
                            <field-label>Produto</field-label>
                            <field-view :text="item.productName"/>
                        </v-col>
                        <v-col cols="12" md="3" class="pt-3">
                            <field-label>Quantidade</field-label>
                            <field-view :text="item.amount"/>
                        </v-col>
                        <v-col cols="12" md="3" class="pt-3">
                            <field-label>Valor</field-label>
                            <field-view :text="item.value | real"/>
                        </v-col>
                        <v-col cols="12" md="3" class="pt-3">
                            <field-label>Valor líquido</field-label>
                            <field-view :text="item.liquidValue | real"/>
                        </v-col>
                        <v-col cols="12" md="3" class="pt-3" v-if="managerUser()">
                            <field-label>Lucro</field-label>
                            <field-view :text="item.profit | real"/>
                        </v-col>
                        <v-col cols="12" md="3" class="pt-3">
                            <field-label>Conta</field-label>
                            <field-view :text="item.accountName"/>
                        </v-col>
                        <v-col cols="12" class="pt-3">
                            <field-label>Descrição</field-label>
                            <field-view :text="item.description"/>
                        </v-col>
                    </v-row>
                </div>
            </v-card-text>
            <v-card-actions>
<!--                <v-spacer></v-spacer>-->
                <v-row align="center"
                       align-content="center"
                       justify="center"
                       no-gutters>

                <v-btn
                    class="mr-2 mt-2"
                    depressed
                    color="info"
                    shaped
                    large
                    @click="$emit('view', item.id)">
                    Visualizar
                </v-btn>
                <v-btn
                    v-if="allowedEdit()"
                    class="mr-2 mt-2"
                    depressed
                    color="warning"
                    shaped
                    large
                    @click="$emit('edit', item.id)">
                    Editar
                </v-btn>
                <v-btn
                    v-if="allowedEdit()"
                    class="mr-2 mt-2"
                    depressed
                    color="error"
                    shaped
                    large
                    @click="$emit('remove', item.id)">
                    Remover
                </v-btn>
                <v-btn
                    class="mr-2 mt-2"
                    depressed
                    color="primary"
                    shaped
                    large
                    @click="$emit('print', item)">
                    Imprimir Boleto
                </v-btn>
                </v-row>
<!--                <v-spacer></v-spacer>-->
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

    import {movementOperationTypes, movementTargetTypes, movementTypes} from '@/core/constants'
    import MovementUtils from '@/core/utils/MovementUtils'

    export default {
        props: {
            show: {
                type: Boolean
            },
            item: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                showDialog: false
            }
        },
        watch: {
            show(val) {
                this.showDialog = !!val;
            },
            showDialog(val) {
                if (!val) {
                    this.$emit('close')
                }
            }
        },
        methods: {
            allowedEdit() {
                return MovementUtils.allowEdit(this.$store.state.loki.user, this.item.createdAt)
            },
            targetName(item) {
                if (item.type === movementTypes.PURCHASE_SALE) {
                    return item.customerName
                } else if (item.type === movementTypes.TRANSFER && item.targetType === movementTargetTypes.ACCOUNT) {
                    return item.targetAccountName
                } else if (item.type === movementTypes.TRANSFER && item.targetType === movementTargetTypes.PRODUCT) {
                    return item.targetUserName
                }
                return ''
            },
            typeName(item) {
                if (item.type === movementTypes.PURCHASE_SALE) {
                    return movementOperationTypes.getName(item.operationType)
                }
                return movementTypes.getName(item.type)
            },
        }
    }
</script>

<style lang="stylus">
.operacaoBusca
    .az-toolbar
        .search
            top 10px !important
            width auto !important

    .totalizador-ativado:before
        opacity 0.24 !important
</style>
