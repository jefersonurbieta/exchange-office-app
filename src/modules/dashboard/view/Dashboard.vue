<template>
    <page-container>
        <v-layout row wrap>
            <v-flex md7 sm12>
                <dashboard-stock
                    mb-2/>
            </v-flex>

            <v-flex md5 sm12>
                <dashboard-my-stock
                    v-if="!managerUser()"
                    mb-2/>
                <dashboard-accounts
                    v-if="managerUser()"
                    mb-2/>
            </v-flex>
        </v-layout>
    </page-container>
</template>

<script>
    import DashboardAccounts from './DashboardAccounts'
    import DashboardStock from './DashboardStock'
    import DashboardMyStock from './DashboardMyStock'

    export default {
        components: {DashboardAccounts, DashboardStock, DashboardMyStock}
    }
</script>

<style lang="stylus" scoped>
    .az-container
        background transparent
</style>
