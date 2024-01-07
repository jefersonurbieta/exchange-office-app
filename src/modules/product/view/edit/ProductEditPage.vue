<template>
    <page-container manager-view>
        <back-button
            :route="{name: routeTypes.PRODUCT.LIST}"
            :show-options="editing && product.id != null"
            :show-remove="editing && product.id != null"
            @remove="remove"/>

        <product-form
            v-if="!loading"
            v-model="product"
            :categories="categories"
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
                product: _.clone(this.$store.state.product.defaultObject),
                categories: [],
                loading: true
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
                    promises.push(this.$store.dispatch(actionTypes.PRODUCT.FIND_BY_ID, this.id))
                } else {
                    this.product = _.clone(this.$store.state.product.defaultObject)
                    promises.push(new Promise((resolve) => resolve()))
                }
                promises.push(this.$store.dispatch(actionTypes.PRODUCT.FIND_ALL_CATEGORIES))

                await Promise.all(promises)
                    .then((responses) => {
                        if (this.id) {
                            this.product = responses[0]
                        }
                        this.categories = responses[1]
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
                this.product = await this.$store.dispatch(actionTypes.PRODUCT.SAVE, this.product)
                this.showSuccessNotification()
                this.disableLoading()
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
