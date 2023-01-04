<template>
    <page-container>
        <container-card className="mt-5">
            <profile-form
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
    import {actionTypes} from '@/core/constants'
    import ProfileForm from './ProfileForm'

    export default {
        components: {ProfileForm},
        data() {
            return {
                id: undefined,
                editing: true,
                user: {}
            }
        },
        async mounted() {
            this.id = this.$store.state.loggedUser.id

            await this.loadRecord()
        },
        methods: {
            async loadRecord() {
                this.user = await this.$store.dispatch(actionTypes.USER.FIND_BY_ID, this.id)
            },
            async save() {
                if (!await this.$validator._base.validateAll()) {
                    return
                }
                this.user = await this.$store.dispatch(actionTypes.USER.SAVE, this.user)
                this.showSuccessNotification()
            },
            async cancel() {
                await this.loadRecord()
            },
        }
    }
</script>
