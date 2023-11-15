<template>
    <page-container manager-view>
        <back-button
            :route="{name: routeTypes.ACCOUNT.LIST}"
            :show-options="editing && account.id != null"
            :show-remove="editing && account.id != null"
            @remove="remove"/>

        <account-form
            v-model="account"
            :editable="editing || !account.id"/>

        <form-buttons
            :editable="editing || !account.id"
            @cancel="cancel"
            @save="save"/>
    </page-container>
</template>

<script>
    import {actionTypes, routeTypes} from '@/core/constants'
    import AccountForm from './AccountForm'
    import _ from 'lodash'

    export default {
        components: {AccountForm},
        data() {
            return {
                id: undefined,
                editing: false,
                account: {}
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
                    this.account = await this.$store.dispatch(actionTypes.ACCOUNT.FIND_BY_ID, this.id)
                } else {
                    this.account = _.clone(this.$store.state.account.defaultObject)
                }
            },
            async save() {
                if (!await this.$validator._base.validateAll()) {
                    return
                }
                this.enableLoading()
                this.account = await this.$store.dispatch(actionTypes.ACCOUNT.SAVE, this.account)
                this.showSuccessNotification()
                this.disableLoading()
                this.redirectToListing()
            },
            async remove() {
                await this.$store.dispatch(actionTypes.ACCOUNT.REMOVE, this.account.id)
                this.showSuccessNotification()
                this.redirectToListing()
            },
            async cancel() {
                await this.loadRecord()
            },
            redirectToListing() {
                this.$router.push({name: routeTypes.ACCOUNT.LIST})
            },
        }
    }
</script>
