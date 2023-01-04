<template>
    <page-container manager-view>
        <company-form
            v-if="!loading"
            v-model="company"
            :editable="editing"/>

        <form-buttons
            :editable="editing"
            @cancel="cancel"
            @save="save"/>
    </page-container>
</template>

<script>
    import {actionTypes} from '@/core/constants'
    import CompanyForm from '@/modules/company/view/edit/CompanyForm'
    import _ from "lodash";

    export default {
        components: {CompanyForm},
        data() {
            return {
                id: undefined,
                editing: true,
                loading: true,
                company: _.clone(this.$store.state.company.defaultObject)
            }
        },
        async mounted() {
            this.id = this.$store.state.loggedCompany.id

            await this.loadRecord()
        },
        methods: {
            async loadRecord() {
                this.company = await this.$store.dispatch(actionTypes.COMPANY.FIND_BY_ID, this.id)
                this.loading = false
            },
            async save() {
                if (!await this.$validator._base.validateAll()) {
                    return
                }
                this.company = await this.$store.dispatch(actionTypes.COMPANY.SAVE, this.company)
                this.showSuccessNotification()
            },
            async cancel() {
                await this.loadRecord()
            },
        }
    }
</script>
