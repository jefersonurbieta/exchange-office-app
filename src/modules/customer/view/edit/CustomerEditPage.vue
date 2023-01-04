<template>
    <page-container>
        <back-button
            :route="{name: routeTypes.CUSTOMER.LIST}"
            :show-options="editing && customer.id"
            :show-remove="editing && customer.id"
            @remove="remove"/>

        <customer-form
            v-model="customer"
            :editable="editing || !customer.id"/>

        <form-buttons
            :editable="editing || !customer.id"
            @cancel="cancel"
            @save="save"/>
    </page-container>
</template>

<script>
    import {actionTypes, routeTypes} from '@/core/constants'
    import CustomerForm from './CustomerForm'
    import _ from 'lodash'

    export default {
        components: {CustomerForm},
        data() {
            return {
                id: undefined,
                editing: false,
                customer: {},
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
                    this.customer = await this.$store.dispatch(actionTypes.CUSTOMER.FIND_BY_ID, this.id)
                } else {
                    this.customer = _.clone(this.$store.state.customer.defaultObject)
                }
            },
            async save() {
                if (!await this.$validator._base.validateAll()) {
                    return
                }
                this.customer = await this.$store.dispatch(actionTypes.CUSTOMER.SAVE, this.customer)
                this.showSuccessNotification()
                this.redirectToListing()
            },
            async remove() {
                await this.$store.dispatch(actionTypes.CUSTOMER.REMOVE, this.customer.id)
                this.showSuccessNotification()
                this.redirectToListing()
            },
            cancel() {
                this.loadRecord()
            },
            redirectToListing() {
                this.$router.push({name: routeTypes.CUSTOMER.LIST})
            },
        }
    }
</script>
