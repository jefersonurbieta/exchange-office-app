<template>
    <page-container manager-view class="caixa-detalhe-content">
        <v-row class="search-row pt-5">
            <v-col cols="3">
                <v-select
                    v-model="userName"
                    :error-messages="errors.first('Usuário')"
                    :items="users"
                    hide-details
                    item-text="name"
                    item-value="name"
                    label="Usuário"
                    name="Usuário"
                    placeholder="Usuário"
                    required
                    solo
                    flat
                    shaped
                    @change="findUserRecords"/>
            </v-col>
            <v-col cols="3">
                <field-date
                    isRequired
                    name-date="Data"
                    v-model="date"
                    @input="findUserRecords"/>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6">
                <stock-balance
                    :items="products"
                    :loading="loading"/>
            </v-col>
            <v-col cols="6">
                <financial-balance
                    :items="accounts"
                    :loading="loading"/>
            </v-col>
        </v-row>
    </page-container>
</template>

<script>
import {actionTypes, statusTypes} from '@/core/constants'
    import StockBalance from './StockBalance'
    import FinancialBalance from './FinancialBalance'

    export default {
        components: {StockBalance, FinancialBalance},
        data() {
            return {
                loading: true,
                userName: undefined,
                date: new Date(),
                user: {},
                users: [],
                accounts: [],
                products: []
            }
        },
        async mounted() {
            await this.findAuxiliaryRecords()
            this.loading = false
        },
        methods: {
            async findAuxiliaryRecords() {
                this.users = await this.$store.dispatch(actionTypes.USER.FIND_ALL_TO_BALANCE)
                this.userName = this.users[0].name
                await this.findUserRecords()
            },
            async findUserRecords() {
                if (!await this.$validator._base.validateAll()) {
                    return
                }
                const promises = []
                const id = this.users.find(user => user.name === this.userName).id
                promises.push( this.$store.dispatch(actionTypes.ACCOUNT.FIND_ALL_COMPLETE, {userId: id, date: this.date, general: this.userName.substr(this.userName.length - 7) === "(Geral)"}))
                promises.push( this.$store.dispatch(actionTypes.PRODUCT.FIND_ALL_COMPLETE, {userId: id, date: this.date, general: this.userName.substr(this.userName.length - 7) === "(Geral)"}))

                this.loading = true
                await Promise.all(promises)
                    .then((responses) => {
                        this.accounts = responses[0].filter(entity => entity.status === statusTypes.ACTIVATED)
                        this.products = responses[1].filter(entity => entity.status === statusTypes.ACTIVATED)
                    })
                    .catch((error) => {
                        console.error('Erro ao fazer requisições:', error);
                    });

                this.loading = false
            }
        }
    }
</script>

<style lang="stylus">
.caixa-detalhe-content
    .v-list__tile__action
        min-width 30px

    .az-toolbar
        .actions
            width 100%

</style>
