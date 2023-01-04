<template>
    <page-container manager-view>
        <back-button
            :route="{name: routeTypes.PRODUCT.LIST}"
            :show-options="editing && product.id"
            :show-remove="editing && product.id"
            @remove="remove"/>

        <product-form
            v-model="product"
            :editable="editing || !product.id"/>

        <form-buttons
            :editable="editing || !product.id"
            @cancel="cancel"
            @save="save"/>
    </page-container>
</template>

<script>
    import {actionTypes, routeTypes} from '@/core/constants'
    import ProductForm from './ProductForm'
    import _ from 'lodash'

    export default {
        components: {ProductForm},
        data() {
            return {
                id: undefined,
                editing: false,
                product: _.clone(this.$store.state.product.defaultObject)
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
                    this.product = await this.$store.dispatch(actionTypes.PRODUCT.FIND_BY_ID, this.id)
                } else {
                    this.product = _.clone(this.$store.state.product.defaultObject)
                }
            },
            async save() {
                if (!await this.$validator._base.validateAll()) {
                    return
                }
                this.product = await this.$store.dispatch(actionTypes.PRODUCT.SAVE, this.product)
                this.showSuccessNotification()
                this.redirectToListing()
            },
            async remove() {
                await this.$store.dispatch(actionTypes.PRODUCT.REMOVE, this.product.id)
                this.showSuccessNotification()
                this.redirectToListing()
            },
            async cancel() {
                await this.loadRecord()
            },
            redirectToListing() {
                this.$router.push({name: routeTypes.PRODUCT.LIST})
            }
        }
    }
</script>
