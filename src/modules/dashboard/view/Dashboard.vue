<template>
    <page-container>
        <v-layout row wrap>
            <v-flex md7 sm12>
                <dashboard-stock
                    :items="companyProducts"
                    :loading="loading"
                    mb-2/>
            </v-flex>

            <v-flex md5 sm12>
                <dashboard-my-stock
                    v-if="!managerUserView()"
                    class="mb-10"
                    :items="userProducts"
                    :loading="loading"/>
                <dashboard-accounts
                    :items="companyAccounts"
                    :loading="loading"
                    mb-2/>
            </v-flex>
        </v-layout>
    </page-container>
</template>

<script>
import DashboardAccounts from './DashboardAccounts'
import DashboardStock from './DashboardStock'
import DashboardMyStock from './DashboardMyStock'
import {actionTypes, statusTypes} from '@/core/constants'

export default {
    components: {DashboardAccounts, DashboardStock, DashboardMyStock},
    data() {
        return {
            companyProducts: [],
            userProducts: [],
            companyAccounts: [],
            loading: true,
        }
    },
    async mounted() {
        await this.findAuxiliaryRecords()
        this.loading = false
    },
    methods: {
        async findAuxiliaryRecords() {
            const promises = []
            promises.push(this.$store.dispatch(actionTypes.PRODUCT.FIND_ALL_COMPLETE, {general: true}))

            if (this.managerUserView()) {
                promises.push(this.$store.dispatch(actionTypes.ACCOUNT.FIND_ALL_COMPLETE, {general: true}))
            } else {
                promises.push(this.$store.dispatch(actionTypes.ACCOUNT.FIND_ALL_COMPLETE, {userId: this.$store.state.loggedUser.id}))
                promises.push(this.$store.dispatch(actionTypes.PRODUCT.FIND_ALL_COMPLETE, {userId: this.$store.state.loggedUser.id}))
            }

            await Promise.all(promises)
                .then((responses) => {
                    this.companyProducts = responses[0].filter(entity => entity.status === statusTypes.ACTIVATED)
                    if (this.managerUserView()) {
                        this.companyAccounts = responses[1].filter(entity => entity.status === statusTypes.ACTIVATED)
                    } else {
                        this.companyAccounts = responses[1].filter(entity => entity.status === statusTypes.ACTIVATED)
                        this.userProducts = responses[2].filter(entity => entity.status === statusTypes.ACTIVATED)
                    }
                })
                .catch((error) => {
                    console.error('Erro ao fazer requisições:', error);
                });
        }
    }
}
</script>

<style lang="stylus" scoped>
.az-container
    background transparent
</style>
