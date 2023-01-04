<template>
    <az-container>
        <v-card>
            <v-card-title primary-title>
                <div>
                    <div class="headline">Lucro por Usuário</div>
                </div>
            </v-card-title>

            <v-data-table
                :headers="columns"
                :hide-default-footer="items.length < pagination.itemsPerPage"
                :items="items"
                :options="pagination">
                <template v-slot:item.lucro="{ item }">
                    {{ item.lucro | value }}
                </template>
            </v-data-table>
        </v-card>
    </az-container>
</template>

<script>
    export default {
        name: 'LucroPorProdutoTabela',
        props: ['items'],
        data() {
            return {
                columns: [
                    {
                        text: 'Nome',
                        align: 'left',
                        value: 'nome',
                        width: '60%',
                        class: 'primary--text'
                    },
                    {
                        text: 'Lucro',
                        align: 'right',
                        value: 'lucro',
                        width: '40%',
                        class: 'primary--text'
                    }
                ],
                pagination: {
                    itemsPerPage: 25
                }
            }
        }
    }
</script>

<style lang="stylus">
    @media (max-width: 720px)
        .tabela-usuarios
            td:nth-of-type(1):before
                content: "Nome:"

            td:nth-of-type(2):before
                content: "Lucro:"

</style>
