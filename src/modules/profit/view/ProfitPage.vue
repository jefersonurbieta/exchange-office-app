<template>
    <page-container manager-view class="lucro-detalhe">
        <v-row class="search-row pt-5 pb-5">
            <v-col cols="3">
                <field-label>Data inicial</field-label>
                <field-date
                    isRequired
                    name-date="Data"
                    v-model="filtro.dataInicio"/>
            </v-col>
            <v-col cols="3">
                <field-label>Data final</field-label>
                <field-date
                    isRequired
                    name-date="Data"
                    v-model="filtro.dataFim"/>
            </v-col>
            <v-col class="mt-7" cols="3">
                <v-btn @click="buscarRegistroUsuario" color="primary" depressed>Pesquisar</v-btn>
            </v-col>
        </v-row>

        <az-ops message="Tente selecionar um usuario e pesquisar."
                title="Ops, nenhum registro encontrado!"
                v-if="!lucro.geral"/>

        <container-card v-if="!carregando">
            <v-tabs pt-1>
                <v-tab key="geral"
                       show-arrows>
                    Geral
                </v-tab>
                <v-tab key="por-produto"
                       show-arrows>
                    Por produto
                </v-tab>
                <v-tab key="por-usuario"
                       show-arrows>
                    Por usuario
                </v-tab>

                <v-tab-item key="geral" v-if="!carregando">
                    <lucro-detalhe-geral :lucro="lucro"/>
                    <lucro-detalhe-por-mes :items="lucro.meses"/>
                </v-tab-item>

                <v-tab-item key="por-produto" v-if="!carregando">
                    <lucro-detalhe-por-produto :items="lucro.produtos"/>
                </v-tab-item>

                <v-tab-item key="por-usuario" v-if="!carregando">
                    <lucro-detalhe-por-usuario :items="lucro.usuarios"/>
                </v-tab-item>
            </v-tabs>
        </container-card>
    </page-container>
</template>

<script>
    import {actionTypes} from '@/core/constants'
    import LucroDetalhePorProduto from './ProfitPerProduct'
    import LucroDetalhePorUsuario from './ProfitPerUser'
    import LucroDetalheGeral from './ProfitGeneral'
    import LucroDetalhePorMes from './ProfitPerMonth'

    export default {
        name: 'CaixaDetalhe',
        components: {
            LucroDetalheGeral,
            LucroDetalhePorMes,
            LucroDetalhePorProduto,
            LucroDetalhePorUsuario
        },
        data() {
            return {
                carregando: true,
                lucro: {},
                filtro: {
                    dateInicio: undefined,
                    dateFim: undefined
                }
            }
        },
        methods: {
            async buscarRegistroUsuario() {
                const validado = await this.$validator._base.validateAll()
                if (!validado) {
                    return
                }
                this.setMensagemLoading('Carregando usuario...')
                this.lucro = await this.$store.dispatch(actionTypes.PROFIT.BUSCAR_LUCRO_GERAL, this.filtro)
                this.carregando = false
            }
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
