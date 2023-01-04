<template>
    <az-container>
        <v-data-table :headers="columns"
                      :items="items"
                      :options="pagination"
                      show-expand>
            <template v-slot:item.valor="{ item }">
                {{ aredondarValor(item.valor) | real }}
            </template>
            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length" class="pa-0">
                    <v-data-table
                            :headers="columnsExpandTable"
                            :items="item.operacoes"
                            :options="paginationExpandTable">
                        <template v-slot:item.dataCadastro="{ item }">
                            {{ item.dataCadastro | datetime }}
                        </template>
                        <template v-slot:item.quantidade="{ item }">
                            {{ item.quantidade | value(undefined, 0) }}
                        </template>
                        <template v-slot:item.custoProduto="{ item }">
                            {{ item.custoProduto | real }}
                        </template>
                        <template v-slot:item.taxaLiquida="{ item }">
                            {{ item.taxaLiquida | real }}
                        </template>
                        <template v-slot:item.valorLiquido="{ item }">
                            {{ item.valorLiquido | real }}
                        </template>
                        <template v-slot:item.lucro="{ item }">
                            {{ item.lucro | real }}
                        </template>
                        <template v-slot:item.acoes="{ item }">
                            <a @click="$router.push({name: 'operacaoDetalhe', params: { id: item.id }})">
                                <v-icon>search</v-icon>
                            </a>
                        </template>
                    </v-data-table>
                </td>
            </template>
        </v-data-table>
    </az-container>
</template>

<script>

    import {NumberUtils} from '@/core/utils'

    export default {
        name: 'LucroDetalhePorUsuario',
        props: ['items'],
        data() {
            return {
                columns: [
                    {
                        text: 'Usuário',
                        align: 'left',
                        value: 'nome',
                        class: 'primary--text'
                    },
                    {
                        text: 'Valor',
                        align: 'right',
                        value: 'valor',
                        class: 'primary--text'
                    },
                    {
                        text: '',
                        value: 'data-table-expand'
                    }
                ],
                columnsExpandTable: [
                    {
                        text: 'Código',
                        align: 'left',
                        value: 'id',
                        class: 'primary--text',
                        visibility: true,
                        width: '1%'
                    },
                    {
                        text: 'Data',
                        align: 'center',
                        value: 'dataCadastro',
                        class: 'primary--text',
                        visibility: true,
                        width: '1%'
                    },
                    {
                        text: 'Cliente',
                        align: 'left',
                        value: 'cliente.nome',
                        class: 'primary--text',
                        visibility: true,
                        width: '1%'
                    },
                    {
                        text: 'Produto',
                        align: 'left',
                        value: 'produtoOrigem.nome',
                        class: 'primary--text',
                        visibility: true,
                        width: '1%'
                    },
                    {
                        text: 'Quantidade',
                        align: 'right',
                        value: 'quantidade',
                        class: 'primary--text',
                        visibility: true,
                        width: '1%'
                    },
                    {
                        text: 'Custo',
                        align: 'right',
                        value: 'custoProduto',
                        class: 'primary--text',
                        visibility: true,
                        width: '1%'
                    },
                    {
                        text: 'Taxa Liquida',
                        align: 'right',
                        value: 'taxaLiquida',
                        class: 'primary--text',
                        visibility: true,
                        width: '1%'
                    },
                    {
                        text: 'Valor',
                        align: 'right',
                        value: 'valorLiquido',
                        class: 'primary--text',
                        visibility: true,
                        width: '1%'
                    },
                    {
                        text: 'Lucro',
                        align: 'right',
                        value: 'lucro',
                        class: 'primary--text',
                        visibility: true,
                        width: '1%'
                    },
                    {
                        text: '',
                        align: 'right',
                        value: 'lucro',
                        class: 'primary--text',
                        visibility: true,
                        width: '1%'
                    }
                ],
                pagination: {
                    itemsPerPage: 15,
                    sortBy: ['valor'],
                    descending: [true]
                },
                paginationExpandTable: {
                    itemsPerPage: 10,
                    sortBy: ['valor'],
                    descending: [true]
                }
            }
        },
        methods: {
            aredondarValor(valor) {
                return NumberUtils.roundValue(valor)
            }
        }
    }
</script>

<style lang="stylus">
    @media (max-width: 720px)
        .tabela-usuarios
            td:nth-of-type(1):before
                content: "Usuário:"

            td:nth-of-type(2):before
                content: "Valor:"

            .table-actions
                display none !important

</style>
