<template>
    <page-container manager-view>
        <back-button
            :route="{name: routeTypes.EXPENSE.LIST}"
            :show-options="editing && expense.id != null"
            :show-remove="editing && expense.id != null"
            @remove="remove"/>

        <expense-form
            v-if="!loading"
            v-model="expense"
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

    export default {
        components: {ExpenseForm},
        data() {
            return {
                id: undefined,
                editing: false,
                loading: true,
                expense: {}
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
                if (this.id) {
                    this.expense = await this.$store.dispatch(actionTypes.EXPENSE.FIND_BY_ID, this.id)
                } else {
                    this.expense = _.clone(this.$store.state.expense.defaultObject)
                }
                this.loading = false
            },
            async save() {
                if (!await this.$validator._base.validateAll()) {
                    return
                }
                this.expense = await this.$store.dispatch(actionTypes.EXPENSE.SAVE, this.expense)
                this.showSuccessNotification()
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
