<template>
    <container-card>
        <v-data-table
            :headers="columns"
            :hide-default-footer="items.length < pagination.itemsPerPage"
            :items="items"
            :options="pagination"
            :search="search"
            :loading="loading"
            class="clickable"
            @click:row="clickRow">
            <template v-slot:item.status="{ item }">
                {{ item.status | status }}
            </template>
            <template v-slot:item.action="{ item }">
                <v-icon>fa-angle-right</v-icon>
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
            search: {
                type: String,
                default: ''
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
                        text: 'Nome',
                        align: 'left',
                        value: 'name',
                        width: '30%',
                        class: 'primary--text'
                    },
                    {
                        text: 'E-mail',
                        align: 'left',
                        value: 'email',
                        width: '20%',
                        class: 'primary--text'
                    },
                    {
                        text: 'Situação',
                        align: 'left',
                        value: 'status',
                        width: '10%',
                        class: 'primary--text'
                    },
                    {
                        text: '',
                        align: 'left',
                        value: 'action',
                        width: '2%',
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
            content: "E-mail:"

        td:nth-of-type(5):before
            content: "Situação:"

        .table-actions
            display none !important

</style>
