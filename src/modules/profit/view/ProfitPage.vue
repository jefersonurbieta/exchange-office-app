<template>
    <page-container manager-view class="lucro-detalhe">
        <v-row class="search-row pt-5 pb-5">
            <v-col cols="3">
                <field-label>Data inicial</field-label>
                <field-date
                    isRequired
                    name-date="Data"
                    v-model="startDate"/>
            </v-col>
            <v-col cols="3">
                <field-label>Data final</field-label>
                <field-date
                    isRequired
                    name-date="Data"
                    v-model="endDate"/>
            </v-col>
            <v-col cols="3">
                <field-label>Categoria</field-label>
                <v-combobox
                    v-model="category"
                    :items="categories"
                    name="Categoria"
                    clearable
                    solo
                    flat
                    shaped/>
            </v-col>
            <v-col class="mt-7" cols="3">
                <v-btn @click="loadRecord" color="primary" depressed>Pesquisar</v-btn>
            </v-col>
        </v-row>

        <az-ops message="Tente selecionar outro período e pesquisar."
                title="Ops, nenhum registro encontrado!"
                v-if="loading"/>

        <profit-general v-if="!loading" :profit="profit"/>

        <material-card class="px-5 py-2" v-if="!loading">
            <template v-slot:heading>
                <v-tabs
                    background-color="transparent"
                    slider-color="white"
                    v-model="tabs">
                    <v-tab key="geral" show-arrows class="mr-3">
                        <v-icon class="mr-2">
                            fa-solid fa-wallet
                        </v-icon>
                        Geral
                    </v-tab>
                    <v-tab key="por-produto" show-arrows class="mr-3">
                        <v-icon class="mr-2">
                            fa-light fa-money-bill-1-wave
                        </v-icon>
                        Por produto
                    </v-tab>
                    <v-tab key="por-usuario" show-arrows class="mr-2">
                        <v-icon class="mr-2">
                            fa-light fa-users
                        </v-icon>
                        Por usuario
                    </v-tab>
                </v-tabs>
            </template>

            <v-tabs-items v-model="tabs" class="transparent">
                <v-tab-item key="geral" v-if="!loading">
                    <profit-per-month :items="profit.months"/>
                </v-tab-item>

                <v-tab-item key="por-produto" v-if="!loading">
                    <profit-per-product :items="profit.perProduct"/>
                </v-tab-item>

                <v-tab-item key="por-usuario" v-if="!loading">
                    <profit-per-user :items="profit.perUser"/>
                </v-tab-item>
            </v-tabs-items>
        </material-card>
    </page-container>
</template>

<script>
import {actionTypes} from '@/core/constants'
import ProfitPerProduct from './ProfitPerProduct'
import ProfitPerUser from './ProfitPerUser'
import ProfitGeneral from './ProfitGeneral'
import ProfitPerMonth from './ProfitPerMonth'

export default {
    components: {
        ProfitGeneral,
        ProfitPerMonth,
        ProfitPerProduct,
        ProfitPerUser
    },
    data() {
        return {
            loading: true,
            startDate: undefined,
            endDate: undefined,
            category: undefined,
            profit: {},
            tabs: 0,
            categories: []
        }
    },
    async mounted() {
        this.startDate = new Date()
        this.startDate.setDate(1)
        this.endDate = new Date()
        await this.findAuxiliaryRecords()
    },
    methods: {
        async loadRecord() {
            if (!await this.$validator._base.validateAll()) return
            this.loading = true
            this.profit = await this.$store.dispatch(actionTypes.PROFIT.FIND_ALL_COMPLETE, {
                startDate: this.startDate,
                endDate: this.endDate,
                category: this.category
            })
            this.loading = false
        },
        async findAuxiliaryRecords() {
            this.categories = await this.$store.dispatch(actionTypes.PRODUCT.FIND_ALL_CATEGORIES)
        },
    }
}
</script>

<style lang="stylus">
.lucro-detalhe
    .v-list__tile__action
        min-width 30px

    .az-toolbar
        .actions
            width 100% !important
            padding-top 10px !important

</style>
