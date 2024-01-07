<template>
    <page-container manager-view>
        <back-button
            :route="{name: routeTypes.EXPENSE.LIST}"
            :show-options="editing && expense.id != null"
            :show-remove="editing && expense.id != null"
            @remove="remove"/>

        <expense-form
            v-show="!loading"
            v-model="expense"
            :accounts="accounts"
            :editable="editing || !expense.id"/>

        <form-buttons
            :editable="editing || !expense.id"
            @cancel="cancel"
            @save="save"/>
    </page-container>
</template>

<script>
    import {actionTypes, routeTypes} from '@/core/constants'
    import ExpenseForm from './ExpenseForm'
    import _ from 'lodash'
    import MovementAccountForm from "@/modules/movement/view/edit/MovementAccountForm.vue";

    export default {
        components: {MovementAccountForm, ExpenseForm},
        data() {
            return {
                id: undefined,
                editing: false,
                loading: true,
                expense: {},
                accounts: [],
            }
        },
        async mounted() {
            this.id = this.$route.params.id

            await this.loadRecord()
            this.setEditing()
        },
        methods: {
            setEditing() {
                this.editing = !this.id || this.managerUser()
            },
            async loadRecord() {
                const promises = []
                if (this.id) {
                    promises.push(this.$store.dispatch(actionTypes.EXPENSE.FIND_BY_ID, this.id))
                } else {
                    this.expense = _.clone(this.$store.state.expense.defaultObject)
                    promises.push(new Promise((resolve) => resolve()))
                }
                promises.push(this.$store.dispatch(actionTypes.ACCOUNT.FIND_ALL_COMPLETE))

                await Promise.all(promises)
                    .then((responses) => {
                        if (this.id) {
                            this.expense = responses[0]
                        }
                        this.accounts = responses[1]
                    })
                    .catch((error) => {
                        console.error('Erro ao fazer requisições:', error);
                    });

                this.loading = false
            },
            async save() {
                if (!await this.$validator._base.validateAll()) {
                    return
                }
                this.enableLoading()
                this.expense = await this.$store.dispatch(actionTypes.EXPENSE.SAVE, this.expense)
                this.showSuccessNotification()

                this.disableLoading()
                this.redirectToListing()
            },
            async remove() {
                await this.$store.dispatch(actionTypes.EXPENSE.REMOVE, this.expense.id)
                this.showSuccessNotification()
                this.redirectToListing()
            },
            async cancel() {
                this.loading = true
                await this.loadRecord()
            },
            redirectToListing() {
                this.$router.push({name: routeTypes.EXPENSE.LIST})
            },
        }
    }
</script>
