<template>
    <v-toolbar-items class="az-avatar">
        <v-dialog
            v-model="dialog"
            width="500">
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-on="on" class="az-avatar__username" text color="#777">
                    <div class="infos">
                        <div class="name">{{ currentCompany.name }}</div>
                    </div>
                    <v-icon right="right">fa-light fa-angle-down</v-icon>
                </v-btn>
            </template>

            <container-card title="Empresas">
                <div class="az-form-content">
                    <div>
                        Essas são as empresas que você tem acesso.
                    </div>
                    <div>
                        Caso queira acessar outra empresa altere o campo abaixo e clique em <strong>alterar</strong>.
                    </div>
                    <br/>
                    <v-select
                        v-model="companyId"
                        :items="companies"
                        class="required"
                        item-text="companyName"
                        item-value="companyId"
                        name="Empresa"
                        placeholder="Ex: Minha empresa"
                        required
                        v-validate="'required'"
                        solo
                        flat
                        shaped/>
                </div>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        :disabled="companyId == currentCompany.id"
                        class="mr-2"
                        depressed
                        color="primary"
                        shaped
                        large
                        @click="change">
                        Alterar
                    </v-btn>
                    <v-btn
                        class="mr-2"
                        depressed
                        color="error"
                        shaped
                        large
                        text
                        @click="cancel">
                        Cancelar
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </container-card>
        </v-dialog>
    </v-toolbar-items>
</template>

<script>
    import {actionTypes} from '@/core/constants'

    export default {
        data() {
            return {
                companyId: this.$store.state.loggedCompany.id,
                dialog: false
            }
        },
        computed: {
            currentCompany() {
                return this.$store.state.loggedCompany
            },
            companies() {
                return this.$store.state.userCompanies
            }
        },
        methods: {
            cancel() {
                this.dialog = false
            },
            change() {
                this.$store.dispatch(actionTypes.COMMON.CHANGE_COMPANY, this.companyId)
            }
        }
    }
</script>
