<template>
    <page-container class="closureBusca">
        <search-row
            v-model="search"
            :showNew="!managerUserView()"
            :advancedSearch="true"
            @new="newEvent()">
            <closure-filter
                v-if="!loading"
                :filter="filter"
                :users="users"
                @clear="cleanFilter"
                @simpleSearch="simpleSearch"
                @advancedSearch="resetTable"/>
        </search-row>

        <closure-table
            :key="resetTableKey"
            :items="items"
            :loading="loading"
            :totalItems="totalItems"
            :search="search"
            :users="users"
            @click:row="clickItem"
            @changePage="advancedSearch"/>

        <v-dialog
            v-model="alertNewItem"
            persistent
            max-width="290"
        >
            <v-card>
                <v-card-text class="pt-5">
                    Ao clicar em criar, o sistema irá realizar a transferência de todo o seu saldo de sua conta para conta da empresa
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        class="mr-2"
                        depressed
                        color="primary"
                        shaped
                        @click="create">
                        Criar
                    </v-btn>
                    <v-btn
                        depressed
                        color="error"
                        shaped
                        @click="cancel">
                        Cancelar
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </page-container>
</template>

<script>

    import {actionTypes, mutationTypes, routeTypes} from '@/core/constants'
    import ClosureTable from './ClosureTable'
    import ClosureFilter from './ClosureFilter'

    export default {
        components: {
            ClosureTable,
            ClosureFilter
        },
        data() {
            return {
                users: [],
                search: '',
                loading: true,
                alertNewItem: false,
                totalItems: 0,
                resetTableKey: 0,
                items: [],
                filter: this.$store.state.closure.defaultFilter
            }
        },
        async mounted() {
            this.filter = this.$store.state.closure.filter
            await this.findAuxiliaryRecords()
        },
        methods: {
            async findAuxiliaryRecords() {
                this.users = await this.$store.dispatch(actionTypes.USER.FIND_ALL)
            },
            async advancedSearch() {
                this.loading = true
                if (!this.managerUserView()) {
                    this.filter.userId.value = this.$store.state.loki.user.id
                }

                this.$store.commit(mutationTypes.CLOSURE.SET_FILTER, this.filter)

                const data = await this.$store.dispatch(actionTypes.CLOSURE.ADVANCED_SEARCH, {
                    filter: this.filter,
                    pagination: this.$store.state.closure.pagination
                })
                this.totalItems = data.count
                this.items = data.content
                this.loading = false
            },
            resetTable() {
                this.resetTableKey += 1
            },
            simpleSearch(valor) {
                this.search = valor
            },
            newEvent() {
                this.alertNewItem = true
            },
            cancel() {
                this.alertNewItem = false
            },
            async create() {
                try {
                    this.enableLoading()
                    this.alertNewItem = false
                    const data = await this.$store.dispatch(actionTypes.CLOSURE.SAVE)
                    this.disableLoading()
                    await this.$router.push({
                        name: routeTypes.CLOSURE.EDIT,
                        params: {id: data.id}
                    })
                } catch (e) {
                    this.cancel()
                    throw e
                }
            },
            clickItem(item) {
                this.$router.push({name: routeTypes.CLOSURE.EDIT, params: {id: item.id}})
            },
            cleanFilter() {
                this.$store.commit(mutationTypes.CLOSURE.SET_FILTER, this.$store.state.closure.defaultFilter)
                this.filter = this.$store.state.closure.filter
                this.resetTable()
            }
        }
    }
</script>
