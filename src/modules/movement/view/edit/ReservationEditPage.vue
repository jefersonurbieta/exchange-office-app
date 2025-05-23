<template>
    <page-container>
        <back-button
            :route="{name: routeTypes.RESERVATION.LIST}"
            :show-options="editing && movement.id != null"
            :show-remove="editing && movement.id != null"
            @remove="remove"/>

        <v-form
            :class="{ 'form-content-view': !editing && movement.id, 'az-form-content': editing }"
            class="form-content pa-0"
            ref="form"
            v-model="valid">
            <movement-data-form
                v-if="!loading && movement.type === movementTypes.PURCHASE_SALE"
                v-model="movement"
                :accounts="accounts"
                :editable="editing"
                :products="products"
                @changedValues="changedValues"/>

            <movement-customer-form
                v-if="!loading && movement.type === movementTypes.PURCHASE_SALE"
                v-model="movement"
                :customers="customers"
                :editable="editing"
                :reservation="editing"/>

            <movement-account-form
                v-if="!loading && movement.type !== movementTypes.PURCHASE_SALE && movement.targetType === movementTargetTypes.ACCOUNT"
                v-model="movement"
                :accounts="accounts"
                :editable="editing"/>

            <movement-product-form
                v-if="!loading && movement.type !== movementTypes.PURCHASE_SALE && movement.targetType === movementTargetTypes.PRODUCT"
                v-model="movement"
                :editable="editing"
                :products="products"
                :users="users"/>
        </v-form>

        <movement-buttons
            v-if="!loading"
            v-model="movement"
            :showPrint="movement.id && (movement.type === movementTypes.PURCHASE_SALE || movement.type === movementTypes.CLOSURE)"
            :showFinishButton="movement.id && movement.status === statusTypes.RESERVED"
            :editable="editing || !movement.id"
            @finish="finish"
            @cancel="cancel"
            @print="print"
            @save="save"/>
    </page-container>
</template>

<script>
import {
    actionTypes,
    movementOperationTypes,
    movementTargetTypes,
    movementTypes,
    routeTypes,
    statusTypes
} from '@/core/constants'
import MovementButtons from './MovementButtons'
import {DateUtils} from '@/core/utils'
import _ from 'lodash'
import MovementCustomerForm from './MovementCustomerForm'
import MovementDataForm from './MovementDataForm'
import MovementAccountForm from './MovementAccountForm'
import MovementProductForm from './MovementProductForm'

export default {
    components: {
        MovementCustomerForm,
        MovementDataForm,
        MovementAccountForm,
        MovementProductForm,
        MovementButtons
    },
    data() {
        return {
            id: undefined,
            editing: false,
            loading: true,
            movement: {},
            customers: [],
            accounts: [],
            products: [],
            users: [],
            valid: true
        }
    },
    async mounted() {
        this.id = this.$route.params.id

        await this.findAuxiliaryRecordsPromise()
        await this.loadObjectsInRegistry()

        this.loading = false
        await this.setEditing()
    },
    methods: {
        async setEditing() {
            if (!this.id) {
                this.editing = true
                return
            }

            if (this.movement.status !== statusTypes.FINISHED && DateUtils.isToday(this.movement.createdAt)) {
                this.editing = true
            }
        },
        async loadRecord() {
            if (this.id) {
                this.movement = await this.$store.dispatch(actionTypes.MOVEMENT.FIND_BY_ID, this.id)
            } else {
                this.movement = _.clone(this.$store.state.movement.reservationDefaultObject)
            }
        },
        async findAuxiliaryRecords() {
            this.accounts = await this.$store.dispatch(actionTypes.ACCOUNT.FIND_ALL)
            this.products = await this.$store.dispatch(actionTypes.PRODUCT.FIND_ALL_COMPANY)
            this.users = await this.$store.dispatch(actionTypes.USER.FIND_ALL)
        },
        async findAuxiliaryRecordsPromise() {
            const promises = []
            if (this.id) {
                promises.push(this.$store.dispatch(actionTypes.MOVEMENT.FIND_BY_ID, this.id))
            } else {
                this.movement = _.clone(this.$store.state.movement.reservationDefaultObject)
                promises.push(new Promise((resolve) => resolve()))
            }

            promises.push(this.$store.dispatch(actionTypes.ACCOUNT.FIND_ALL))
            promises.push(this.$store.dispatch(actionTypes.PRODUCT.FIND_ALL_COMPANY))
            promises.push(this.$store.dispatch(actionTypes.USER.FIND_ALL))

            await Promise.all(promises)
                .then((responses) => {
                    if (this.id) {
                        this.movement = responses[0]
                    }
                    this.accounts = responses[1]
                    this.products = responses[2]
                    this.users = responses[3]
                })
                .catch((error) => {
                    console.error('Erro ao fazer requisições:', error);
                });
        },
        async loadObjectsInRegistry() {
            if (this.movement.customerId) {
                this.movement.customer = await this.$store.dispatch(actionTypes.CUSTOMER.FIND_BY_ID, this.movement.customerId)
            }
            if (this.movement.productId) {
                this.movement.product = this.getObjectById(this.products, this.movement.productId)
            }
            if (this.movement.targetProductId) {
                this.movement.targetProduct = this.getObjectById(this.products, this.movement.targetProductId)
            }
            if (this.movement.accountId) {
                this.movement.account = this.getObjectById(this.accounts, this.movement.accountId)
            }
            if (this.movement.targetAccountId) {
                this.movement.targetAccount = this.getObjectById(this.accounts, this.movement.targetAccountId)
            }
            if (this.movement.targetUserId) {
                this.movement.targetUser = this.getObjectById(this.users, this.movement.targetUserId)
            }
        },
        async save() {
            if (!await this.$validator._base.validateAll()) {
                this.showErrorNotification('Preecha todos os campos!')
                return
            }

            if (!this.checkAllowedAmount()) {
                this.showErrorNotification('A quantidade da operação não pode ser maior que a quantidade disponível!')
                return
            }

            if (!this.checkAllowedValue()) {
                this.showErrorNotification('Valor não pode ser maior que o valor disponível da conta!')
                return
            }

            const movementToSave = Object.assign({}, this.movement)
            delete movementToSave.customer
            delete movementToSave.account
            delete movementToSave.targetAccount
            delete movementToSave.product
            delete movementToSave.targetUser

            const movementSaved = await this.$store.dispatch(actionTypes.MOVEMENT.SAVE, movementToSave)
            this.showSuccessNotification()
            this.redirectToListing(movementSaved)
        },
        async finish() {
            const movementSaved = await this.$store.dispatch(actionTypes.MOVEMENT.FINISH, this.movement.id)
            this.showSuccessNotification()
            this.redirectToListing(movementSaved)
        },
        async remove() {
            if ((this.movement.targetType === movementTargetTypes.PRODUCT && this.movement.type === movementTypes.INPUT) || (this.movement.type === movementTypes.PURCHASE_SALE && this.movement.operationType === movementOperationTypes.PURCHASE)) {
                const lastProductInputId = await this.$store.dispatch(actionTypes.MOVEMENT.FIND_LAST_PRODUCT_INPUT_ID, this.movement.productId)

                if (lastProductInputId !== this.movement.id) {
                    this.showErrorNotification('Não é possível excluir esta entrada do produto, pois já foi realizado uma nova movimentação para este produto!')
                    return
                }
            }

            await this.$store.dispatch(actionTypes.MOVEMENT.REMOVE, this.movement.id)
            this.showSuccessNotification()
            this.redirectToListing()
        },
        checkAllowedAmount() {
            if (this.movement.type === movementTypes.PURCHASE_SALE
                && this.movement.operationType === movementOperationTypes.SALE
                && this.movement.product
                && this.movement.product.showAmount
                && this.movement.amount > this.movement.product.amount) {
                return false
            }

            return !(this.movement.type === movementTypes.OUTPUT
                && this.movement.targetType === movementTargetTypes.PRODUCT
                && this.movement.amount > this.movement.product.amount)

        },
        checkAllowedValue() {
            return !(this.movement.type === movementTypes.OUTPUT
                && this.movement.targetType === movementTargetTypes.ACCOUNT
                && this.movement.account.value < this.movement.value)
        },
        changedValues(value) {
            this.movement = value
        },
        async cancel() {
            const movementSaved = await this.$store.dispatch(actionTypes.MOVEMENT.CANCEL, this.movement.id)
            this.showSuccessNotification()
            this.redirectToListing(movementSaved)
        },
        print() {
            this.$store.dispatch(actionTypes.MOVEMENT.PRINT, {
                movement: this.movement,
                company: this.$store.state.loggedCompany
            })
        },
        redirectToListing() {
            this.$router.push({name: routeTypes.RESERVATION.LIST})
        }
    }
}
</script>
