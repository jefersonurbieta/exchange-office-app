<template>
    <container-card>
        <v-data-table
            :headers="columns"
            :items="items"
            :server-items-length="totalItems"
            :options.sync="pagination"
            :footer-props="footerProps"
            :search="search"
            :loading="loading"
            @click:row="clickItem"
            @update:options="alterOptions">
            <template v-slot:item.createdAt="{ item }">
                {{ item.createdAt | datetime }}
            </template>
            <template v-slot:item.type="{ item }">
                <v-chip :color="colorByType(item)" small outlined>
                    {{ typeName(item) }}
                </v-chip>
            </template>
            <template v-slot:item.target="{ item }">
                <v-icon :color="colorByType(item)" small>{{ targetIcon(item) }}</v-icon>
                {{ targetName(item) }}
            </template>
            <template v-slot:item.amount="{ item }">
                {{ hideByType(item) | value }}
            </template>
            <template v-slot:item.productCost="{ item }">
                {{ item.productCost | real }}
            </template>
            <template v-slot:item.liquidRate="{ item }">
                {{ item.liquidRate | real }}
            </template>
            <template v-slot:item.value="{ item }">
                {{ item.value | real }}
            </template>
            <template v-slot:item.action="{ item }" @click="$emit('view',item.id)">
                <a @click="$emit('view',item.id)">
                    <v-icon>fa-angle-right</v-icon>
                </a>
            </template>
        </v-data-table>
    </container-card>
</template>

<script>
    import {movementOperationTypes, movementTargetTypes, movementTypes, mutationTypes} from '@/core/constants'

    export default {
        props: {
            items: {
                type: Array
            },
            totalItems: {
                type: Number,
                default: 0
            },
            search: {
                type: String,
                default: ''
            },
            loading: {
                type: Boolean,
                default: true
            },
            reservation: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                pagination: {
                    page: 1,
                    itemsPerPage: 25,
                    sortBy: ['createdAt'],
                    sortDesc: [true],
                    multiSort: false
                },
                columns: [
                    {
                        text: 'Data',
                        align: 'center',
                        value: 'createdAt',
                        class: 'primary--text',
                        width: '1%'
                    },
                    {
                        text: 'Operação',
                        align: 'center',
                        value: 'type',
                        class: 'primary--text',
                        width: '1%'
                    },
                    {
                        text: 'Usuário',
                        align: 'left',
                        value: 'userName',
                        class: 'primary--text',
                        width: '1%'
                    },
                    {
                        text: 'Destino',
                        align: 'left',
                        value: 'target',
                        class: 'primary--text',
                        width: '1%',
                        sortable: false
                    },
                    {
                        text: 'Produto',
                        align: 'left',
                        value: 'productName',
                        class: 'primary--text',
                        width: '1%'
                    },
                    {
                        text: 'Quantidade',
                        align: 'right',
                        value: 'amount',
                        class: 'primary--text',
                        width: '1%'
                    },
                    {
                        text: 'Custo',
                        align: 'right',
                        value: 'productCost',
                        class: 'primary--text',
                        width: '1%'
                    },
                    {
                        text: 'Taxa',
                        align: 'right',
                        value: 'liquidRate',
                        class: 'primary--text',
                        width: '1%'
                    },
                    {
                        text: 'Valor',
                        align: 'right',
                        value: 'value',
                        class: 'primary--text',
                        width: '1%'
                    },
                    {
                        text: 'Conta',
                        align: 'left',
                        value: 'accountName',
                        class: 'primary--text',
                        width: '1%'
                    },
                    {
                        text: '',
                        align: 'left',
                        value: 'action',
                        width: '1%',
                        class: 'primary--text'
                    }
                ],
                footerProps: {
                    itemsPerPageOptions: [5, 10, 25, 50, 100, 250]
                }
            }
        },
        methods: {
            targetName(item) {
                if (item.type === movementTypes.PURCHASE_SALE) {
                    return item.customerName
                } else if (item.type === movementTypes.TRANSFER && item.targetAccountId) {
                    return item.targetAccountName
                } else if (item.type === movementTypes.TRANSFER && item.targetUserId) {
                    return item.targetUserName
                }
                return ''
            },
            targetIcon(item) {
                if (item.type === movementTypes.PURCHASE_SALE && item.customerId) {
                    return 'supervisor_account'
                } else if (item.type === movementTypes.TRANSFER && item.targetAccountId) {
                    return 'fa-light fa-building-columns'
                } else if (item.type === movementTypes.TRANSFER && item.targetUserId) {
                    return 'person'
                }
                return ''
            },
            colorByType(item) {
                if (item.type === movementTypes.PURCHASE_SALE && item.operationType === movementOperationTypes.SALE) {
                    return 'primary'
                } else if (item.type === movementTypes.PURCHASE_SALE && item.operationType === movementOperationTypes.PURCHASE) {
                    return 'secondary'
                } else if (item.type === movementTypes.INPUT) {
                    return 'accent'
                } else if (item.type === movementTypes.OUTPUT) {
                    return '#E82C0C'
                } else if (item.type === movementTypes.TRANSFER) {
                    return '#2EB0AA'
                } else if (item.type === movementTypes.CLOSURE) {
                    return '#681E70'
                }
            },
            typeName(item) {
                if (item.type === movementTypes.PURCHASE_SALE) {
                    return movementOperationTypes.getName(item.operationType)
                }
                return movementTypes.getName(item.type)
            },
            hideByType(item) {
                if (movementTypes.PURCHASE_SALE
                    || item.type === movementTypes.TRANSFER && item.targetType === movementTargetTypes.PRODUCT) {
                    return item.amount
                }
                return undefined
            },
            alterOptions(options) {
                if(this.reservation) {
                    this.$store.commit(mutationTypes.MOVEMENT.SET_PAGINATION, options)
                } else {
                    this.$store.commit(mutationTypes.MOVEMENT.SET_PAGINATION, options)
                }
                this.$emit('changePage', options)
            },
            clickItem(item) {
                this.$emit('click:row', item)
            }
        }
    }
</script>

<style lang="stylus">
tfoot
    background-color #DDDDDD

@media (max-width: 720px)
    .tabela-usuarios
        td:nth-of-type(1):before
            content: "Cliente:"

        td:nth-of-type(2):before
            content: "Produto:"

        td:nth-of-type(3):before
            content: "Operação:"

        td:nth-of-type(4):before
            content: "Quantidade:"

        td:nth-of-type(5):before
            content: "Valor:"

        td:nth-of-type(6):before
            content: "Conta:"

        td:nth-of-type(7):before
            content: "Data:"

        td:nth-of-type(8):before
            content: "Usuário:"

        .table-actions
            display none !important

.coluna-acoes
    display block
    width 120px

.coluna-codigo
    display block
    width 40px

.v-chip .v-chip__content
    padding 0 5px !important


</style>
