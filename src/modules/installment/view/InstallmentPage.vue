<template>
    <page-container manager-view className="caixa-detalhe-content">
        <v-row className="search-row pt-5">
            <v-col cols="3">
                <field-label>Valor</field-label>
                <field-money
                    v-model="value"
                    id="valor"
                    name="valor"
                    prefix=""
                    placeholder="Ex. 100"
                    @change="calc"/>
            </v-col>
            <v-col cols="3">
                <field-label>Taxa</field-label>
                <field-money
                    v-model="rate"
                    id="valor"
                    name="valor"
                    prefix=""
                    placeholder="Ex. 4,5"
                    @change="calc"/>
            </v-col>
            <v-col cols="3">
                <v-btn
                    class="mt-7"
                    depressed
                    color="primary"
                    shaped
                    @click="calc">
                    Calcular
                </v-btn>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <installment-table
                    :items="installments"
                    :loading="loading"/>
            </v-col>
        </v-row>
    </page-container>
</template>

<script>
import {actionTypes} from '@/core/constants'
import InstallmentTable from './InstallmentTable'

export default {
    components: {InstallmentTable},
    data() {
        return {
            loading: true,
            value: 0,
            rate: this.$store.state.loggedCompany.installmentConfig.rate,
            installments: [],
            user: {},
            users: [],
            products: []
        }
    },
    async mounted() {
        this.loading = false
    },
    methods: {
        async calc() {
            this.installments = await this.$store.dispatch(actionTypes.INSTALLMENT.CALC, {
                value: this.value,
                rate: this.rate
            })
            console.log(this.installments)
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
