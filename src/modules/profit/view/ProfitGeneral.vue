<template>
    <v-row justify="center">
        <v-col cols="12" sm="6" md="4" pa-2>
            <mini-statistic
                    :title="aredondarValor(lucro.geral) | real"
                    color="green"
                    sub-title="Total Geral"/>
        </v-col>

        <v-col cols="12" sm="6" md="4" pa-2>
            <mini-statistic
                    :title="aredondarValor(lucro.mesAtual) | real"
                    color="blue"
                    sub-title="Total este mês"/>
        </v-col>
    </v-row>
</template>

<script>

    import { NumberUtils } from '@/core/utils'

    export default {
        name: 'LucroDetalheGeral',
        props: ['lucro'],
        methods: {
            aredondarValor( valor ) {
                return NumberUtils.roundValue(valor)
            }
        }
    }
</script>
