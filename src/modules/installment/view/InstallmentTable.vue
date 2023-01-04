<template>
    <container-card>
        <v-data-table
            :headers="columns"
            :hide-default-footer="items.length < pagination.itemsPerPage"
            :items="items"
            :options="pagination"
            :loading="loading"
            class="clickable"
            @click:row="clickRow">
            <template v-slot:item.installmentValue="{ item }">
                {{ item.installmentValue | real }}
            </template>
            <template v-slot:item.totalAmount="{ item }">
                {{ item.totalAmount | real }}
            </template>
            <template v-slot:item.charges="{ item }">
                {{ item.charges | real }}
            </template>
        </v-data-table>
    </container-card>
</template>

<script>
export default {
    props: {
        items: {
            type: Array
        },
        loading: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            columns: [
                {
                    text: 'Parcela',
                    align: 'left',
                    value: 'installment',
                    width: '50%',
                    class: 'primary--text'
                },
                {
                    text: 'Valor Parcela',
                    align: 'left',
                    value: 'installmentValue',
                    width: '10%',
                    class: 'primary--text'
                },
                {
                    text: 'Total Compra',
                    align: 'left',
                    value: 'totalAmount',
                    width: '10%',
                    class: 'primary--text'
                },
                {
                    text: 'Juros',
                    align: 'left',
                    value: 'charges',
                    width: '10%',
                    class: 'primary--text'
                }
            ],
            pagination: {
                itemsPerPage: 25
            }
        }
    },
    methods: {
        clickRow(item) {
            this.$emit('click:row', item)
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
            content: "Saldo:"

        td:nth-of-type(3):before
            content: "Situação:"

        .table-actions
            display none !important

    .coluna-acoes-busca-conta
        display block
        width 70px

</style>
