<template>
    <container-card>
        <v-data-table
            :headers="columns"
            :items="items"
            :server-items-length="totalItems"
            :options.sync="pagination"
            :footer-props="footerProps"
            :search="search"
            :loading="loading"
            @click:row="clickItem"
            @update:options="alterOptions">
            <template v-slot:item.createdAt="{ item }">
                {{ item.createdAt | datetime }}
            </template>
            <template v-slot:item.user="{ item }">
                {{ getNameById(users, item.userId) }}
            </template>
            <template v-slot:item.action="{ item }">
                <v-icon>fa-angle-right</v-icon>
            </template>
        </v-data-table>
    </container-card>
</template>

<script>

    import {mutationTypes} from '@/core/constants'

    export default {
        props: {
            items: {
                type: Array
            },
            totalItems: {
                type: Number,
                default: 0
            },
            users: {
                type: Array,
                default: () => []
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
                pagination: {
                    page: 1,
                    itemsPerPage: 25,
                    sortBy: ['createdAt'],
                    sortDesc: [true],
                    multiSort: false
                },
                columns: [
                    {
                        text: 'Data',
                        align: 'center',
                        value: 'createdAt',
                        class: 'primary--text',
                        width: '40%'
                    },
                    {
                        text: 'Usuário',
                        align: 'left',
                        value: 'user',
                        class: 'primary--text',
                        width: '40%'
                    },
                    {
                        text: '',
                        align: 'left',
                        value: 'action',
                        width: '2%',
                        class: 'primary--text'
                    }
                ],
                footerProps: {
                    itemsPerPageOptions: [5, 10, 25, 50, 100, 250]
                }
            }
        },
        methods: {
            alterOptions(options) {
                this.$store.commit(mutationTypes.CLOSURE.SET_PAGINATION, options)
                this.$emit('changePage', options)
            },
            clickItem(item) {
                this.$emit('click:row', item)
            }
        }
    }
</script>
