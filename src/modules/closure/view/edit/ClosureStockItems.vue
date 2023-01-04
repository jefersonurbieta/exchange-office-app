<template>
    <container-card title="Estoque" icon="fa-light fa-money-bill-1-wave">
        <v-data-table
            :headers="columns"
            :hide-default-footer="items.length < pagination.itemsPerPage"
            :items="items"
            :options="pagination"
            :loading="loading">
            <template v-slot:item.value="{ item }">
                {{ item.value | value }}
            </template>
        </v-data-table>
    </container-card>
</template>

<script>

    export default {
        props: {
            items: {
                type: Array,
                default: () => []
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
                        text: 'Produto',
                        align: 'left',
                        value: 'productName',
                        width: '60%',
                        class: 'primary--text'
                    },
                    {
                        text: 'Quantidade',
                        align: 'right',
                        value: 'value',
                        width: '30%',
                        class: 'primary--text'
                    }
                ],
                pagination: {
                    itemsPerPage: 50
                }
            }
        }
    }
</script>
