<template>
    <container-card class="mb-5">
        <v-row>
            <v-col cols="12" md="4" v-if="!created && editable">
                <field-label>Cliente</field-label>
                <v-autocomplete
                    v-model="value.customer"
                    :items="items"
                    :loading="isLoading"
                    :search-input.sync="search"
                    color="white"
                    item-text="name"
                    item-value="API"
                    placeholder="Nome cliente"
                    no-data-text="Digite o nome do cliente para buscar"
                    return-object
                    required
                    v-validate="'required'"
                    solo
                    flat
                    shaped
                    clearable
                    no-filter
                />
            </v-col>
            <v-col cols="12" md="8" v-if="!created && editable">
            </v-col>

            <v-col cols="12" md="4">
                <field-label>Nome</field-label>
                <field-view
                    v-if="value.customer"
                    :text="value.customer.name"/>
            </v-col>

            <v-col cols="12" md="4">
                <field-label>E-mail</field-label>
                <field-view
                    v-if="value.customer"
                    :text="value.customer.email"/>
            </v-col>

            <v-col cols="12" md="4">
                <field-label>Documento</field-label>
                <field-view
                    v-if="value.customer"
                    :text="value.customer.cpfCnpj"/>
            </v-col>

            <v-col cols="12" md="4">
                <v-dialog
                    v-model="dialog"
                    persistent
                    content-class="dialog-with-title"
                    max-width="70%"
                    >
                    <container-card title="Cliente">
                        <customer-form
                            v-model="localCustomer"
                            :editable="true"/>

                        <v-row justify="center" class="mb-8">
                            <v-spacer></v-spacer>
                            <form-buttons
                                :editable="true"
                                @cancel="cancel"
                                @save="save"/>
                        </v-row>
                    </container-card>
                </v-dialog>
            </v-col>
        </v-row>
    </container-card>
</template>

<script>

    import CustomerForm from '@/modules/customer/view/edit/CustomerForm'
    import {actionTypes, statusTypes} from '@/core/constants'
    import _ from 'lodash'

    export default {
        components: {CustomerForm},
        props: {
            value: {
                required: true,
                default: {}
            },
            editable: {
                type: Boolean,
                default: false
            },
            customers: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                localCustomer: _.clone(this.$store.state.customer.defaultObject),
                created: false,
                dialog: false,
                descriptionLimit: 60,
                createCustomerMessage: 'Nenhum cliente encontrado, cadastrar um novo?',
                entries: [],
                isLoading: false,
                search: null
            }
        },
        computed: {
            items() {
                return this.entries.map(entry => {
                    const name = entry.name.length > this.descriptionLimit
                        ? entry.name.slice(0, this.descriptionLimit) + '...'
                        : entry.name

                    return Object.assign({}, entry, {name})
                })
            },
        },
        methods: {
            cancel() {
                this.dialog = false
                this.localCustomer = {
                    status: statusTypes.ACTIVATED
                }
            },
            async save() {
                if (!this.localCustomer.name || !this.localCustomer.email || !this.localCustomer.phone) {
                    await this.$validator._base.validateAll()
                    return
                }
                this.value.customer = await this.$store.dispatch(actionTypes.CUSTOMER.SAVE, this.localCustomer)
                this.value.customerId = this.value.customer.id
                this.items.push(this.value.customer)
                this.dialog = false
                this.created = true
            }
        },
        watch: {
            search(val) {
                if (!val || val.length === 0) {
                    this.entries = []
                    return
                }
                if (this.isLoading) return
                this.isLoading = true

                const filter = {
                    name: {
                        value: val
                    }
                }
                this.$store.dispatch(actionTypes.CUSTOMER.ADVANCED_SEARCH, {
                    filter, pagination: {
                        page: 1,
                        itemsPerPage: 25,
                        sortBy: ['name'],
                        sortDesc: [false],
                    }
                })
                    .then(data => {
                        this.entries = data.content

                        if (this.entries.length === 0) {
                            this.entries.push({
                                name: this.createCustomerMessage
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    .finally(() => (this.isLoading = false))
            },
            'value.customer'() {
                if (this.value.customer) {
                    if (this.value.customer.name === this.createCustomerMessage) {
                        this.dialog = true
                        this.value.customer = {}
                    } else {
                        this.value.customerId = this.value.customer.id
                    }
                }
            }
        }
    }
</script>

<style lang="stylus">
.dialog-with-title
    padding-top 40px
    overflow-x hidden

</style>
