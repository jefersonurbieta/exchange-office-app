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
                    v-if="!managerUser()"
                    :items="userProducts"
                    :loading="loading"
                    mb-2/>
                <dashboard-accounts
                    v-if="managerUser()"
                    :items="companyProducts"
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
import {actionTypes} from "@/core/constants";

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

            if (this.managerUser()) {
                promises.push(this.$store.dispatch(actionTypes.ACCOUNT.FIND_ALL_COMPLETE, {general: true}))
            } else {
                promises.push(this.$store.dispatch(actionTypes.PRODUCT.FIND_ALL_COMPLETE, {userId: this.$store.state.loggedUser.id}))
            }

            await Promise.all(promises)
                .then((responses) => {
                    this.companyProducts = responses[0]
                    if (this.managerUser()) {
                        this.companyAccounts = responses[1]
                    } else {
                        this.userProducts = responses[1]
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
