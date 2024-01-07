<template>
    <page-container manager-view>
        <back-button :route="{name: routeTypes.USER.LIST}"/>

        <container-card class="mt-5">
            <user-form
                v-show="!loading"
                :editable="editing"
                v-model="user"/>
        </container-card>

        <form-buttons
            :editable="editing"
            @cancel="cancel"
            @save="save"/>
    </page-container>
</template>

<script>
    import {actionTypes, routeTypes} from '@/core/constants'
    import UserForm from './UserForm'
    import _ from 'lodash'

    export default {
        components: {UserForm},
        data() {
            return {
                id: undefined,
                editing: true,
                loading: true,
                user: {}
            }
        },
        async mounted() {
            this.id = this.$route.params?.id

            await this.loadRecord()
            this.setEditing()
        },
        methods: {
            setEditing() {
                this.editing = !this.id || this.managerUser()
            },
            async loadRecord() {
                if (this.id) {
                    this.user = await this.$store.dispatch(actionTypes.USER.FIND_BY_ID, this.id)
                } else {
                    this.user = _.clone(this.$store.state.user.defaultObject)
                }
                this.loading = false
            },
            async save() {
                if (!await this.$validator._base.validateAll()) {
                    return
                }
                this.enableLoading()

                this.user = await this.$store.dispatch(actionTypes.USER.SAVE, this.user)
                this.showSuccessNotification()

                this.disableLoading()
                this.redirectToListing()
            },
            async cancel() {
                await this.loadRecord()
            },
            redirectToListing() {
                this.$router.push({name: routeTypes.USER.LIST})
            },
        }
    }
</script>
