<template>
    <container-card title="Caixa" icon="fa-light fa-building-columns">
        <v-data-table
            :headers="columns"
            :hide-default-footer="items.length < pagination.itemsPerPage"
            :items="items"
            :options="pagination"
            :loading="loading">
            <template v-slot:item.value="{ item }">
                {{ item.value | real }}
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
                        text: 'Conta',
                        align: 'left',
                        value: 'accountName',
                        width: '60%',
                        class: 'primary--text'
                    },
                    {
                        text: 'Valor',
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
