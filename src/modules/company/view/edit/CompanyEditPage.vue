<template>
    <page-container manager-view>
        <back-button :route="{name: routeTypes.COMPANY.LIST}"/>

        <company-form
            v-model="company"
            :editable="editing"/>

        <form-buttons
            :editable="editing"
            @cancel="cancel"
            @save="save"/>
    </page-container>
</template>

<script>
    import {actionTypes, routeTypes} from '@/core/constants'
    import CompanyForm from './CompanyForm'
    import _ from 'lodash'

    export default {
        components: {CompanyForm},
        data() {
            return {
                id: undefined,
                editing: false,
                company: _.clone(this.$store.state.company.defaultObject)
            }
        },
        async mounted() {
            console.log(this.company)
            this.id = this.$route.params.id
            await this.loadRecord()

            this.setEditing()
            console.log(this.company)
        },
        methods: {
            setEditing() {
                if (!this.id || this.managerUser()) {
                    this.editing = true
                }
            },
            async loadRecord() {
                if (this.id) {
                    this.company = await this.$store.dispatch(actionTypes.COMPANY.FIND_BY_ID, this.id)
                } else {
                    this.company = _.clone(this.$store.state.company.defaultObject)
                }
            },
            async save() {
                if (!await this.$validator._base.validateAll()) {
                    return
                }
                this.company = await this.$store.dispatch(actionTypes.COMPANY.SAVE, this.company)
                this.showSuccessNotification()
                this.redirectToListing()
            },
            async cancel() {
                await this.loadRecord()
            },
            redirectToListing() {
                this.$router.push({name: routeTypes.COMPANY.LIST})
            },
        }
    }
</script>
